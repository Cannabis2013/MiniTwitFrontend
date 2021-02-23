import Vue from 'vue';
import {router} from "@/main";
export const EventBus = new Vue();

function handleUserSignOut(response)
{
    Vue.$cookies.remove("UserName");
    Vue.$cookies.remove("TokenId");
    router.push("/");
    console.log("handleResponse: " +  response);
    EventBus.$emit("UserStatusChanged",false);
}

EventBus.$on("UserSignOut",response => handleUserSignOut(response));