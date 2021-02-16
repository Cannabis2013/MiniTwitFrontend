import axios from "axios";

const apiHostUrl = "https://localhost:5001/MiniTwitIndex/"

export default {
  name: 'signincomponent',
  components: {},
  props: [],
  data () {
    return {
      username: "",
      password: "",
      errorMessage : ""
    }
  },
  mounted () {
  },
  methods: {
    handleSubmit : function() {
      if(this.username !== "" && this.password !== "")
        this.sendSignInRequest();
      else
        this.errorMessage = "Please fill in all fields!";
      },
    sendSignInRequest : function()
    {
      axios({
        method : "post",
        url : apiHostUrl + "SignInUser",
        params : {
          userName : this.username,
          password : this.password,
          userMail : this.username,
          localAdress : this.$cookies.get("LocalAddress")
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
        
        Context-relevant responseCode values:
          - 2 : user sign-in success
          - 64 : User doesn't exist
          - 129 : That means user exists but sign-in failed
          - 1024 : Bad json argument - This typically occurs when clients send bad formatted json objects
       */
      if (response["responseCode"] === 2)
      {
        // User issigned in
        this.$cookies.set("TokenId", response["tokenId"]);
        this.$cookies.set("UserName", response["userName"])
        this.$router.push('/');
      }
      else if(response["responseCode"] === 64)
      {
        // User doesn't exist
        this.errorMessage = "User with provided credentials doesn't exist.";
      }
    },
    handleNoResponse : function(response){
      this.errorMessage = "No response from serve!";
      console.log(response);
    }
  }
}


