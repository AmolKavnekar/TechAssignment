# TechAssignment

Solutions: 
	I have created the three solutions as follows:
•	DCRM: Configuration – All the configuration changes and web resources the added here 
•	DCRM: Apps - I have created the Separate Model driven app named DCRM Assignment for this implementation. We can add multiple Apps inside this solution.
•	DCRM: Flows – It includes the all the power Automate we can build during the implementation.

![image](https://user-images.githubusercontent.com/73215047/141625647-2633eeb4-2381-455e-a8cc-b9caccb81aba.png)

I have also check the issues while exporting the solution.

![image](https://user-images.githubusercontent.com/73215047/141941420-9b5ddf3e-502e-47dd-9bc4-3754d4e1e8b4.png)

 
 
Publisher:
	Name: DCRM Tech Assignment 
	Prefix: dcrm
	
![image](https://user-images.githubusercontent.com/73215047/141625885-9b80bac6-896a-4126-880e-f6f1fa9ad0ef.png)
 
 
 DEVOPS-
 Implemented the DevpoS pipeline for Solution movement from Dev environemnt to QA. You can find the Devops at - https://dev.azure.com/Tech-Assignment/Tech-Assignment.
 We have some limitation on trial instance from the Microsoft side to run this pipeline.Due to them I am unable to run it succesfully. But I am confident enough that this will run once we get the licenes from the Microsoft.
 https://docs.microsoft.com/en-us/azure/devops/pipelines/licensing/concurrent-jobs?view=azure-devops&tabs=ms-hosted
 
 ![image](https://user-images.githubusercontent.com/73215047/141657983-12afbfd1-b765-4cc4-a94e-301c24e50e6d.png)

 
 
 
 
Details: 
1. I have created the 2 Auto number fields as below
•	Sort Code
•	Account Number

2. Avoid Duplicate Record: 

    I have created the alternate keys to restrict creation of a new account with the same details. We could have used duplicate detection rule, but DDR will ultimately allow to create duplicate record if user select the ignore and save option, so I have unpublished the existing duplicate detection rules.
    Duplicate detection rule has following limitations
•	It works only for tables and not for phones, doesn’t work when lead is converted to account or contact using qualify button
•	There can be only 5 duplicate detection rules per entity.


 ![image](https://user-images.githubusercontent.com/73215047/141626251-d5b96736-e801-49ae-9377-52e6e9eeeef9.png)

I have created the plugin to avoid duplicate records on Name and address field. As we cannot create the alternate key for the same.(DCRM.Account.RestrictDuplicatecreation.Plugin) 


3. Validation:
•	Email: Using OOB email field. No need to add any other validation other than blank data while creating record.  

•	Name: Name is Mandatory Field.

•	Address: Using OOB address1 field. Also Implment the Postcodes API integration to get the complete address based on the Postcode. You need to type the postcode and on chnage of the postal code fields javascript will trigger  get the address and populate the same in the respective fields.- (accountLibrary.js)

•	Account Type: I am using Category field as a Account type field.

 ![image](https://user-images.githubusercontent.com/73215047/141626439-b605bd58-bff0-4718-a65c-6a938db0129c.png)

•	Currency: Using OOB currency field. To update the currency exchange rate, I have scheduled the power automate job (DCRM : Currencies - Update Exchange Rate) using · exchangeratesapi.io API. Currently I have scheduled it to run once in a day, we can run the job as per our requirement. The flow is residing in the solution named DCRM: Flows

 ![image](https://user-images.githubusercontent.com/73215047/141626607-ace80c0e-ad44-4d0d-acdd-76147c420c55.png)

•	Phone Number : Using OOB phone field.I have added the control  inputmask.
	
	
![image](https://user-images.githubusercontent.com/73215047/141658622-953d3927-436a-4c68-a226-43ac0a6cd740.png)

 •	Assistant : I have created the custom entity named "Assistant" with the Phone number and Email fields.
 		     Created the lookup on the Account enitity of Assiatant name field. Also created the phone and email field.
		     Once we select the Assistant on the account name. Phone and Email will auto populate from the Assistant entity.I have develop the Java Script code.
 
 ![image](https://user-images.githubusercontent.com/73215047/141791949-c6ea6b6d-26e8-4e15-921e-d755351a5072.png)



4. Searching for existing accounts:
•	By using one, or more account fields:
o	I have enabled the Searchable Yes to following fields
	 Email
	Name
	Account Number 
	Sort Code
	Phone
•	· Selection of the account from search results list to edit its details:
o	We can select multiple account from the Views and bulk edit the information.
Views:
	I have created the following views 
•	All Accounts
•	My Active Accounts
•	My Inactive Accounts
•	In active Accounts.
	

 
	
 

Technical Implementation:
	1.Power Automate : DCRM : Currencies - Update Exchange Rate  
		Develop this power automate to update the exchange rate of currency 
•	Scheduled the power automate once in a day.
•	Using the exchnageratesapi.io API get the latest exchange rates. Currently API is visible, but we can use Azure KeyVault to store that API in the keyVault. Using azure connector, we can retrieve the API key and use it in the power automate without exposing it to the users/ Developers.   
•	If we want, we can also create the Customer connector for the API calling. And instead of using HTTP connector we could use that custom connector.
![image](https://user-images.githubusercontent.com/73215047/141626952-972d222a-b192-4586-92fb-686d1a6ac449.png)

  

•	In Next Step Getting the active Currencies form the dynamics

   ![image](https://user-images.githubusercontent.com/73215047/141627023-07921a85-da08-42a1-b76d-8edf6db2609b.png)


 
•	Updating the fetch currencies 
body('HTTP_GET_Exchange_Rate')?['rates']?[items('Apply_to_each')?['isocurrencycode']]

 ![image](https://user-images.githubusercontent.com/73215047/141627110-ab993741-2e65-4ce9-b028-2a7052f8e4a0.png)


Also handled the exception using Scope action. If any one of the above steps fails, I am sending the email stating the same to the admin.  

![image](https://user-images.githubusercontent.com/73215047/141627199-2218f7a3-6bf8-4702-b0c8-33d7dc7393c9.png)




 

2.Web Resource
accountLibrary.js –
	This web resource is used to fetch the data from Postcode.io API based on the postal code. 


3.Workflows: 
DCRM: Account – Send Welcome Email –
	When you account is created using this workflow I am sending the  welcome email to customer.
	Created the email template “Welcome Email” to send the email. 
 
![image](https://user-images.githubusercontent.com/73215047/141648790-77228c17-cc9c-4c5d-8d1b-98bd69dd8a7f.png)

Note: I could use the Power Automate also to acheive the same but currently we need to perform the extra steps to get email template.

4.Custom Entities :

	Created custom entity named as "Assistant" which is act as master data for assistant.

	Created Assistant lookup field on the account form.
	
![image](https://user-images.githubusercontent.com/73215047/141745538-1ce7cbc2-6981-4531-b651-121f4b9e2f93.png)

 


Azure Blob Storage : 
	As I am using trial instance I don't have the capability to create theAzure storage account. Hence unbale to implement the same.But i Have written steps hoe we can acheive the same.
	
1. Download Solution : We can download the Attachment Management solution form the market place. Its free and developed by the Microsoft.	

2.Azure Configuration : Create a container within Azure Blob storage. This will be entered in the Dynamics 365 configuration so the system knows that any attachments will be stored within that container, which sits in Azure.

3.Dynamics Configuration: Install the downloaded solution. We can configure how Dynamics will be communicating with Azure Blob Storage. This consists of Storage Account Name, Azure SAS Token, the notes and email attachments containers and an optional GUID field.After configuring Azure Blob Storage set up within Dynamics 365, the admin will now have to enable the entities that will be using this add-on to upload documents and attachments

we can look at how to enable the functionality so end-users are able to upload multiple files onto the form using the web resources provided by the solution. These web resources are: msdyn_filesandattachments.html and msdyn_multiple_uploads.html.


Screen Shots:
I have created the model driven app "DCRM Assignment".

![image](https://user-images.githubusercontent.com/73215047/141951029-2cbdaba0-4c43-4193-90ca-ad7231e93e57.png)

Account :

![image](https://user-images.githubusercontent.com/73215047/141951593-4670c26b-90c2-478f-afc6-7e64e915a961.png)

Created the 4 views as follows

![image](https://user-images.githubusercontent.com/73215047/141951668-8f40206a-7f5c-4156-84c8-cc07f643ffd2.png)

Edit Account :

![image](https://user-images.githubusercontent.com/73215047/141951719-eb6cdf40-7458-4b47-8e0d-3ebfbcfa103d.png)

![image](https://user-images.githubusercontent.com/73215047/141951769-154b52c7-4f2a-4c5e-84ed-42933d7b39a8.png)

 Navigation :

![image](https://user-images.githubusercontent.com/73215047/141951835-396a284f-904b-4d19-a444-cd4297371b1e.png)

![image](https://user-images.githubusercontent.com/73215047/141951873-20d90f67-9f8b-4d9b-85b9-11e5abc11155.png)


      
