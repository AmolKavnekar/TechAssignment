var accountMainForm = window.accountMainForm || {}; 
const variables ={
    Street1 : "address1_line1",
    Street2 : "address1_line2",
    Street3 : "address1_line3",
    Country :"address1_country" , 
    City:"address1_city",
    PostalCode:"address1_postalcode",
    State:"address1_stateorprovince",
  };
   

 /*
retrieveAddress function takes Postal code and retrieves address present in the Postcode system based on the given postal code
Logic
1.If Postal code filed is empty gives error message to user.
2.Postal code containts data then calling Postcode.io API call to get the Address and set the values in respective fields.
*/
accountMainForm.retrieveAddress = function(executionContext)
{ 
    "use strict";
    try{
      var formContext = executionContext.getFormContext();  
      var Postalcodevalue = formContext.getAttribute(variables.PostalCode).getValue();
      if(Postalcodevalue!=null)
      {
        Xrm.Navigation.openAlertDialog("Postal code must contains data to fetch the address from API.");
      }else{
      var request = new XMLHttpRequest();
      request.open('GET', 'https://api.postcodes.io/postcodes/'+ Postalcodevalue  , true);
      request.onload = function () {
      
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {

          formContext.getAttribute(variables.Street1).setValue(data.result.admin_ward);
          formContext.getAttribute(variables.City).setValue(data.result.parish);
          formContext.getAttribute(variables.Country).setValue(data.result.country);
          formContext.getAttribute(variables.State).setValue(data.result.region);
          formContext.getAttribute(variables.postalcode).setValue(Postalcodevalue);
        } 
        else{
          Xrm.Navigation.openAlertDialog(data.error);

        }
      }
      
      request.send();
      }
     }
catch(err)
{
  Xrm.Navigation.openAlertDialog(err);
}
}
 

