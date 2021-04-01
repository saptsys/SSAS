const axios = require("axios").default

axios.post("https://ssas.saptsys.com/api/firm",{
  gstin:"27AAACR5055K1Z7"
}).then(function (response){
  const data = response.data
  console.log("response +++++++++++++ " , response.data)

  const isExpired = data.expired
  if(isExpired){
    return Promise.reject("Trial Period is Expired! If You Still Want to Use Then Buy Licence")
  }

  const isNew  = !data.existing;
  if(isNew){
    // do something
  }else{
    // do sometihng
  }



}).catch(function (response){
  console.log("response ---------------- " , response)
  return Promise.reject({message:"something went wrong."})
})
