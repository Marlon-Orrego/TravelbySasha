import Vue from 'vue'
var app = new Vue({

   data: {
      registerActive: false,
      emailLogin: "",
      passwordLogin: "",
      emailReg: "",
      passwordReg: "",
      confirmReg: "",
      emptyFields: false
   },

   methods: {
      async doLogin() {
         if (this.emailLogin === "" || this.passwordLogin === "") {
            this.emptyFields = true;
         } else {
            let url="http://localhost:8000/login"
            const auth = await fetch(url, {
               "email":this.emailLogin,
               "password":this.passwordLogin
            });
            console.log(auth)
           
         }
      },

      doRegister() {
         if (this.emailReg === "" || this.passwordReg === "" || this.confirmReg === "") {
            this.emptyFields = true;
         } else {
            alert("You are now registered");
         }
      }
   }
});

export default app