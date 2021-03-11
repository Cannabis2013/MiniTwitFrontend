import axios from "axios";
import {EventBus} from "@/eventBus";
import TitleBox from "../textbox/index.vue"

export default {
  name: 'signincomponent',
  components: {
    TitleBox
  },
  props: [],
  data () {
    return {
      username: "",
      password: "",
      errorMessage : "",
      pendingForReply : false
    }
  },
  mounted () {
    console.log("Signin mounted!");
  },
  methods: {
    handleSubmit : function() 
    {
      let u = this.username;
      let p = this.password;
      if(this.verifyInput(u,p))
        this.sendSignInRequest(u,p);
      else
        this.errorMessage = "Please fill in all fields!";
    },
    verifyInput : function(userName, password)
    {
      /*
        Peform validety check of user entered input.
        
        Please notice, that this is very dependent on the contract that exists between the exchanging parties.
        
        If there are any other demands with regard to credentials format, implement here.
       */
      return userName !== "" && password !== "";
    },
    sendSignInRequest : function(un,pw)
    {
      this.pendingForReply = true;
      axios({
        method : "post",
        header : "application/json",
        url : this.apiHostUrl + "SignInUser",
        data : {
          userName : un,
          password : pw,
          Email : un,
          TokenAddress : this.$cookies.get("TokenAddress")
        }
      }).then(response => {
        /*
        Backend returns data in the following format:
          - responseCode : Response code in decimal
          - userName
          - userMail
          - tokenId : An unique 'uuid' user id
          - message : An optional message that is empty at default
        
        Context-relevant responseCode values:
          - 2 : user sign-in success
          - 64 : User doesn't exist
          - 129 : That means user exists but sign-in failed
          - 258 : Bad json argument - This typically occurs when clients send bad formatted json objects
       */
        if (response.data["responseCode"] === 2)
        {
          // User is signed in
          this.$cookies.set("TokenId", response.data["tokenId"]);
          this.$cookies.set("UserName", response.data["userName"]);
          EventBus.$emit("UserStatusChanged",true);
          this.$router.push('/');
        }
        // User doesn't exist
        else if(response["responseCode"] === 64)
        {
          this.errorMessage = "User with provided credentials doesn't exist.";
        }
        this.pendingForReply = false;
      })
          .catch(data => this.handleNoResponse(data));
    },
    handleNoResponse : function(response){
      this.pendingForReply = false;
      this.errorMessage = "No response from serve!";
      console.log(response);
    }
  }
}


