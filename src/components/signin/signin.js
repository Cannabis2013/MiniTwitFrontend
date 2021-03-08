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
        url : this.apiHostUrl + "SignInUser",
        params : {
          userName : un,
          password : pw,
          userMail : un,
          TokenAddress : this.$cookies.get("TokenAddress")
        }
      }).then(response => this.handleResponse(response.data))
          .catch(data => this.handleNoResponse(data));
    },
    handleResponse : function(response)
    {
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
          - 1024 : Bad json argument - This typically occurs when clients send bad formatted json objects
       */
      if (response["responseCode"] === 2)
      {
        // User is signed in
        this.$cookies.set("TokenId", response["tokenId"]);
        this.$cookies.set("UserName", response["userName"]);
        EventBus.$emit("UserStatusChanged",true);
        this.$router.push('/');
      }
        // User doesn't exist
      else if(response["responseCode"] === 64)
      {
        this.errorMessage = "User with provided credentials doesn't exist.";
      }
      this.pendingForReply = false;
    },
    handleNoResponse : function(response){
      this.pendingForReply = false;
      this.errorMessage = "No response from serve!";
      console.log(response);
    }
  }
}


