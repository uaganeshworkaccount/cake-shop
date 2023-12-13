(function(KoreSDK){
    let z=localStorage.getItem("credentials")
    var KoreSDK=KoreSDK||{};

    var botOptionsWiz = {};
    botOptionsWiz.logLevel = 'debug';
    botOptionsWiz.koreAPIUrl = "https://bots.kore.ai";

    botOptionsWiz.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
    botOptionsWiz.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
    botOptionsWiz.botInfo = { name: "cakebuddy", "_id": "st-4c1b80ae-3a1b-5c15-971e-a4d919135803" ,"customData":{"name":"ganesh1"} }; // bot name is case sensitive
    botOptionsWiz.clientId = "cs-fd313e7c-67be-5cc2-b8ee-e3662cb5030b";
    botOptionsWiz.clientSecret = "LDvjcfa5xvHD3hyYAPzaeI9b6L8H+Y0s8OdXq+84+cM=";

    var widgetsConfig = {
        botOptions: botOptionsWiz
    };
    
    KoreSDK.widgetsConfig=widgetsConfig
})(window.KoreSDK);