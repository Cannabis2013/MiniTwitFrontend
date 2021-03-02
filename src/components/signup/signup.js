import axios from "axios";
import {EventBus} from "@/eventBus";
import TitleBox from "../textbox/index.vue"

export default {
  name: 'signupcomponent',
  components: {
    TitleBox
  },
  props: [],
  data () {
    return {
      username: "",
      password: "",
      errorMessage: ""
    }
  },
  mounted () {
  },
  methods: 
  {
    handleSubmit : function() 
    {
      let u = this.username;
      let p = this.password;
      if(this.verifyInput(u,p))
        this.sendSignInRequest(u,p);
      else
        this.errorMessage = "Please fill in all fields!";
    },
    verifyInput : function(un, pw)
    {
      /*
        Peform validety check of user entered input.
        
        Please notice, that this is very dependent on the contract that exists between the exchanging parties.
        
        If there are any other demands with regard to credentials format, implement here.
       */
      return un !== "" && pw !== "";
    },
    sendSignUpRequest : function(un,pw)
    {
      axios({
        method : "post",
        url : this.apiHostUrl + "signUpUser",
        params : {
          userName : un,
          password : pw,
          userMail : un,
          localAddress : this.$cookies.get("LocalAddress")
        },
        headers : {
          "Content-Type" : "application/json"
        }
      })
          .then(response => this.handleResponse(response.data))
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
      
      responseCode values:
        - 18 : user is created and signed in
        - 1024 : Bad json argument
            This typically occurs when clients send bad formatted json objects
     */
    if (response.responseCode === 18)
    {
      // User is created and signed in
      this.$cookies.set("TokenId", response.tokenId);
      this.$cookies.set("UserName", response.userName);
      EventBus.$emit("UserStatusChanged",true);
      this.$router.push('/').then(r => console.log(r));
    }
    // Handle invalid json arguments
    else if(response.responseCode === 1024)
    {
      console.log("Invalid json argument");
    }
    },
    handleNoResponse : function(data)
    {
      this.errorMessage = "No response from server";
      console.log(data);
    },
  }
}


