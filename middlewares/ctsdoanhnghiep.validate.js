const {check} = require('express-validator');
module.exports.validateCTSDoanhNghiep = () => {
    return [ 
      check('tenGD', 'Tên Giao Dịch không được trống').not().isEmpty(),
      check('giayPhepDKKD', 'Giây phép DKKD không được trống').not().isEmpty(),
      check('ngayCapGiayPhepDKKD', 'Ngày cấp GPDKKD không được trống').not().isEmpty(),
      check('MST', 'Mã số thuế không được trống').not().isEmpty(),
      check('MST', 'Vui lòng nhập đúng định dạng Mã số thuế').isLength({max:10,min:10}),
      check('camKet', 'Vui lòng xác nhận cam kết').not().isEmpty(),
      check('diaChi', 'Địa chỉ không được trống').not().isEmpty(),
      check('tinhThanh', 'Tỉnh thành không được trống').not().isEmpty(),
      check('quanHuyen', 'Quận Huyện không được trống').not().isEmpty(),
      check('soDienThoaiCongTy', 'Số điện thoại công ty không được trống').not().isEmpty(),
      check('soDienThoaiCongTy', 'Vui lòng nhập đúng định dạng số điện thoại').isLength({max:10,min:10}),
      check('emailGD', 'Email giao dich không được trống').not().isEmpty(),
      check('emailGD', 'Vui lòng nhập đúng định dạng Email').isEmail(),
      check('hoTenChuDoanhNghiep', 'Họ tên chủ doanh nghiệp không được trống').not().isEmpty(),
      check('emailChuDoanhNghiep', 'Email doanh nghiệp không được trống').not().isEmpty(),
      check('emailChuDoanhNghiep', 'Vui lòng nhập đúng định dạng Email!').isEmail(),
      check('soCMT', 'Số chứng minh thư không được trống').not().isEmpty(),
      check('noiCapCMT', 'Nơi cấp chứng minh thư không được trống').not().isEmpty(),
      check('ngayCapCMT', 'Ngày cấp chứng minh thư không được trống').not().isEmpty(),
      check('goiCTSId', 'Vui lòng chọn gói giao dịch').not().isEmpty(),
      check('thoiHan', 'Thời hạn sử dụng không được trống').not().isEmpty(),
      check('giaCuoc', 'Giá cước không được trống').not().isEmpty(),
      check('nguoiThucHien', 'Người thực hiện không được trống').not().isEmpty(),
    ]; 
  }
