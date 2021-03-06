import { convertToDDMMYYYY, convertToYYYYMMDD } from './convert.js'
import { fetchAPI,
    fetchAndShowData 
} from './fetch.js'
const trashPersonal = document.querySelector('#trashPersonal')
const trashOrganization = document.querySelector('#trashOrganization')
const formRestorePersonal = document.querySelector('#formRestorePersonal')
const formDestroyPersonal = document.querySelector('#formDestroyPersonal')
const formRestoreOrganization = document.querySelector('#formRestoreOrganization')
const formDestroyOrganization = document.querySelector('#formDestroyOrganization')

import { url } from './constants.js'

async function getTrashCTSCaNhan(){
    try{
        //get cts from daily1
        const urlList1 = url + `api/digital-certificate/personal/trash/agency1`
        //get cts from self
        const urlList2 = url + `api/digital-certificate/personal/trash/byUserId`
        const options = {
            method: 'GET'
        }
        const CTSCaNhanByAgency = await fetchAPI(urlList1, options)
        const CTSCaNhanBySelf = await fetchAPI(urlList2, options)
        const data = [ ...CTSCaNhanByAgency, ...CTSCaNhanBySelf ]
        return showTrashPersonal(data)
       
    }catch(err){
        console.log(err)
    }
}
getTrashCTSCaNhan()
async function showTrashPersonal(data){
    let html = ''
    const services = await getServices()
    if(data.length!=0){
        data.forEach((cts, index)=> {   
            services.forEach(service => {
                if(cts.goiCTSId == service._id){
                    cts = { ...service, ...cts }
                }
            })
           html+=`<tr style="background:#cfebff">
           <td><a href="" class="btn btn-action btn-success btn-restore" data-id=${cts._id}>Khôi phục</a></td>
           <td><a href="" class="btn btn-action btn-danger btn-destroy" data-id=${cts._id}>Xóa vĩnh viễn</a></td>
           <td scope="row">${index+1}</td>
           <td><p>${cts._id}</p></td>
           <td>${cts.hoTenNguoiDK}</td>
           <td>${cts.soCMT}</td>
           <td>${cts.MSTCaNhan}</td>
           <td>${cts.tenGoiDichVu}</td>
           <td>${cts.thoiHan}</td>
           <td>${convertToDDMMYYYY(cts.ngayTao)}</td>
           <td>${cts.nguoiThucHien}</td>
           <td>${(cts.fileHoSo.length == 0) ? 'Chưa đủ' : 'Đủ'}</td>
           
    
         </tr>`
         trashPersonal.innerHTML = html

        })
        const btnsRestore = document.querySelectorAll('.btn-restore')
        btnsRestore.forEach(btn=>{
            btn.onclick = (e) =>{
                e.preventDefault()
                alert('Khôi phục thành công')
                formRestorePersonal.action = `/digital-certificate/trash/${btn.dataset.id}/restore`
                formRestorePersonal.submit()
            }
        })
        confirmDelete()

    }else {
        trashPersonal.innerHTML = '<td colspan="12"><h3 class="text-md-center">Hiện không có dữ liệu</h3></td>'
    }
    

}
// Doanh Nghiep
async function getTrashCTSDoanhNghiep(){
    try{
        //get cts from daily1
        const urlList1 = url + `api/digital-certificate/organization/trash/agency1`
        //get cts from self
        const urlList2 = url + `api/digital-certificate/organization/trash/byUserId`
        const options = {
            method: 'GET'
        }
        const CTSDoanhNghiepByAgency = await fetchAPI(urlList1, options)
        const CTSDoanhNghiepBySelf = await fetchAPI(urlList2, options)
        const data = [ ...CTSDoanhNghiepByAgency, ...CTSDoanhNghiepBySelf ]
        console.log(data)
        return showTrashOrganization(data)
       
    }catch(err){
        console.log(err)
    }
}
getTrashCTSDoanhNghiep()
async function showTrashOrganization(data){
    let html = ''
    const services = await getServices()
    console.log(data.length)
    if(data.length!=0){
        data.forEach((cts, index)=> {   
            services.forEach(service => {
                if(cts.goiCTSId == service._id){
                    cts = { ...service, ...cts }
                }
            })
           html+=`<tr style="background:#cfebff">
           <td><a href="" class="btn btn-action btn-success btn-restore" data-id=${cts._id}>Khôi phục</a></td>
           <td><a href="" class="btn btn-action btn-danger btn-destroy" data-id=${cts._id}>Xóa vĩnh viễn</a></td>
           <td scope="row">${index+1}</td>
           <td><p>${cts._id}</p></td>
           <td>${cts.tenGD}</td>
           <td>${cts.soCMT}</td>
           <td>${cts.MST}</td>
           <td>${cts.tenGoiDichVu}</td>
           <td>${cts.thoiHan}</td>
           <td>${convertToDDMMYYYY(cts.ngayTao)}</td>
           <td>${cts.nguoiThucHien}</td>
           <td>${(cts.fileHoSo.length == 0) ? 'Chưa đủ' : 'Đủ'}</td>
          
    
         </tr>`
         trashOrganization.innerHTML = html

        })
        const btnsRestore = document.querySelectorAll('.btn-restore')
        btnsRestore.forEach(btn=>{
            btn.onclick = (e) =>{
                e.preventDefault()
                alert('Khôi phục thành công')
                formRestoreOrganization.action = `/digital-certificate/trash/${btn.dataset.id}/restoreOrg`
                formRestoreOrganization.submit()
            }
        })
        confirmDeleteOrg()

    }else {
        trashOrganization.innerHTML = '<td colspan="12"><h3 class="text-md-center">Hiện không có dữ liệu</h3></td>'
    }
    

}

async function getServices(){
    try{
        const res = await fetch('http://localhost:3000/api/services')
        const services = await res.json()
        return services
    }catch(err){
        console.log(err)
    }
}
//confirm delete personal
const confirmDelete = function(){
    // Get the modal
    const modalDelete = document.getElementById("modalDelete");

    // Get the button that opens the modal
    
    const btnsDestroy = document.querySelectorAll('.btn-destroy')
  
    const btnDel = document.querySelector('.deletebtn')
    
    // Get the <span> element that closes the modal
    const btnCancel = document.querySelector('.cancelbtn')
    // When the user clicks the button, open the modal 
    if(btnsDestroy.length!=0){
        btnsDestroy.forEach(btn=>{
            btn.onclick = function(e) {
                e.preventDefault()
                modalDelete.style.opacity = "1";
                modalDelete.style.display = "block"
                btnDel.dataset.id = this.dataset.id
                btnDel.onclick = (e) =>{
                    e.preventDefault()
                    formDestroyOrganization.action = `/digital-certificate/trash/${btnDel.dataset.id}/force-destroyOrg`
                    formDestroyOrganization.submit()
                
                }
              
               
            }
            
        })
    
    }
 



    btnCancel.onclick = function() {
       modalDelete.style.opacity = "0"
       setTimeout(()=>{modalDelete.style.display = "none";
           },450)
   }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modalDelete) {
            modalDelete.style.opacity = "0"
        setTimeout(()=>{modalDelete.style.display = "none";
            },450)
        }
    }


}
//organization
//confirm delete
const confirmDeleteOrg = function(){
    // Get the modal
    const modalDelete = document.getElementById("modalDelete");

    // Get the button that opens the modal
    
    const btnsDestroy = document.querySelectorAll('.btn-destroy')
  
    const btnDel = document.querySelector('.deletebtn')
    
    // Get the <span> element that closes the modal
    const btnCancel = document.querySelector('.cancelbtn')
    // When the user clicks the button, open the modal 
    if(btnsDestroy.length!=0){
        btnsDestroy.forEach(btn=>{
            btn.onclick = function(e) {
                e.preventDefault()
                modalDelete.style.opacity = "1";
                modalDelete.style.display = "block"
                btnDel.dataset.id = this.dataset.id
                btnDel.onclick = (e) =>{
                    e.preventDefault()
                    formDestroyPersonal.action = `/digital-certificate/trash/${btnDel.dataset.id}/force-destroyOrg`
                    formDestroyPersonal.submit()
                }
              
               
            }
            
        })
    
    }
 



    btnCancel.onclick = function() {
       modalDelete.style.opacity = "0"
       setTimeout(()=>{modalDelete.style.display = "none";
           },450)
   }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modalDelete) {
            modalDelete.style.opacity = "0"
        setTimeout(()=>{modalDelete.style.display = "none";
            },450)
        }
    }


}


