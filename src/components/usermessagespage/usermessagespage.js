
import MessageModel from "../messagecomponent/index.vue"
import CreatePost from "../createpost/index.vue"

export default {
  name: 'signedinmessagescomponent',
  components: {
    MessageModel,
    CreatePost
  },
  props: [],
  data () {
    return {
      messages: []
    }
  },
  computed: {

  },
  mounted () {

    const aReplyToCannabis = {
      author_name : "TechnoTonny",
      text : "Er du fuld af peps, Cannabis2013?",
      pub_date : "17-02-2021",
      author_id : 2
    };
    
    const anotherPostFromCannabis = {
      author_name : "Cannabis2013",
      text : "Slet ikke nogen friske på lidt 'ind og ud'?",
      pub_date : "16-02-2021",
      author_id : 1
    };

    const aPostFromCannabis = {
      author_name : "Cannabis2013",
      text : "Jeg er total liderlig i dag. Nogen friske på lidt hygge?",
      pub_date : "16-02-2021",
      author_id : 1
    };
    this.messages.push(aReplyToCannabis);
    this.messages.push(anotherPostFromCannabis);
    this.messages.push(aPostFromCannabis);
  },
  methods: {

  }
}


