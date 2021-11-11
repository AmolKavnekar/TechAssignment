# TechAssignment

1.We ahve created the 2 Autonumber fields as below
  i. Sort Code
  ii. Acoount Number

2. Dedup : 
    I have created the alternate keys to restrict creation of a new account with the same details. We couls have used duplicate detection rule but DDR will ultimatelyt allow to       create duplicate record if user select the ignor and save option, so i have unpublishes the existing deuplicate detection rules.
    Duplicate detction rule has following limitations
          . It works only for tables and not for phones, doesn’t work when lead is converted to account or contact using qualify button
          . There can be only 5 duplicate detection rules per entity.
      
