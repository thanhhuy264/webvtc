function getSendMailPersonal(){
    const formSendMailPersonal = document.querySelector('#formSendMailPersonal')
    const btnsSendMail = document.querySelectorAll('.btn-sendMail')
    btnsSendMail.forEach(btn=>{
        btn.onclick = (e) => {
            e.preventDefault()
            formSendMailPersonal.action = `/digital-certificate/personal/send-mail/${btn.dataset.id}`
            setTimeout(()=>{
                alert('Gửi thành công')
            },2000)
            formSendMailPersonal.submit()
          
        }
    })
}
function getSendMailFindPersonal(){
    const formSendMailPersonal = document.querySelector('#formSendMailFindPersonal')
    const btnsSendMail = document.querySelectorAll('.btn-sendMail')
    btnsSendMail.forEach(btn=>{
        btn.onclick = (e) => {
            e.preventDefault()
            formSendMailPersonal.action = `/digital-certificate/personal/send-mail/${btn.dataset.id}`
            setTimeout(()=>{
                alert('Gửi thành công')
            },2000)
            formSendMailPersonal.submit()
        }
    })
}
function getSendMailOrganization(){
    const formSendMailOrganization = document.querySelector('#formSendMailOrganization')
    const btnsSendMail = document.querySelectorAll('.btn-sendMailOrg')
    btnsSendMail.forEach(btn=>{
        btn.onclick = (e) => {
            e.preventDefault()
            formSendMailOrganization.action = `/digital-certificate/organization/send-mailOrg/${btn.dataset.id}`
            setTimeout(()=>{
                alert('Gửi thành công')
            },2000)
            formSendMailOrganization.submit()
           
        }
    })
}
function getSendMailFindOrganization(){
    const formSendMailOrganization = document.querySelector('#formSendMailFindOrganization')
    const btnsSendMail = document.querySelectorAll('.btn-sendMailOrg')
    btnsSendMail.forEach(btn=>{
        btn.onclick = (e) => {
            e.preventDefault()
            formSendMailOrganization.action = `/digital-certificate/organization/send-mailOrg/${btn.dataset.id}`
            setTimeout(()=>{
                alert('Gửi thành công')
            },2000)
            formSendMailOrganization.submit()
        }
    })
}
   
export { 
    getSendMailPersonal,
    getSendMailOrganization,
    getSendMailFindPersonal,
    getSendMailFindOrganization
}