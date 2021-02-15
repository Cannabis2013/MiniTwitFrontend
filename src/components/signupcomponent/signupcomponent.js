import axios from "axios";

const apiHostUrl = "https://localhost:5001/MiniTwitIndex/"

export default {
  name: 'signupcomponent',
  components: {},
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
      console.log("test1");
      this.sendSignUpRequest();
    },
    sendSignUpRequest : function()
    {
      console.log("test2");
      axios({
        method : "post",
        url : apiHostUrl + "signUpUser",
        data : {
          localAdress : this.$cookies.get("LocalAddress"),
          userName : this.username,
          password : this.password,
          userMail : this.username
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
      this.$cookies.set("tokenId", response.tokenId);
      this.$cookies.set("UserName", response.userName)
      this.$router.push('home').then(r => console.log(r));
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

