import { motion } from 'framer-motion'
import {
    AlertCircle,
    CheckCircle,
    Download,
    Eye,
    FileSpreadsheet,
    Upload,
    X,
    XCircle
} from 'lucide-react'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import * as XLSX from 'xlsx'

const ExcelImport = ({ 
  onDataImport, 
  onClose, 
  title = "Import từ Excel",
  templateColumns = [],
  validationRules = {},
  maxRows = 1000
}) => {
  const [file, setFile] = useState(null)
  const [data, setData] = useState([])
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  // Sample template data for classes (Vietnamese format)
  const sampleClassData = [
    { 
      'Tên lớp': 'DH22TIN06', 
      'Khối lớp': 'DH22TIN', 
      'Mô tả': 'Lớp Công nghệ thông tin khóa 2022', 
      'Số học sinh tối đa': 50 
    },
    { 
      'Tên lớp': 'DH22TIN07', 
      'Khối lớp': 'DH22TIN', 
      'Mô tả': 'Lớp Công nghệ thông tin khóa 2022', 
      'Số học sinh tối đa': 50 
    },
    { 
      'Tên lớp': 'DH23TIN01', 
      'Khối lớp': 'DH23TIN', 
      'Mô tả': 'Lớp Công nghệ thông tin khóa 2023', 
      'Số học sinh tối đa': 45 
    }
  ]

  // Sample template data for students (Vietnamese format)
  const sampleStudentData = [
    {
      'STT': 1,
      'Mã sinh viên': '221222',
      'Họ đệm': 'Lê Văn Nhựt',
      'Tên': 'Anh',
      'Giới tính': 'Nam',
      'Ngày sinh': '30/10/2004',
      'Lớp học': 'DH22TIN06'
    },
    {
      'STT': 2,
      'Mã sinh viên': '222803',
      'Họ đệm': 'Trần Nguyễn Phươ',
      'Tên': 'Bách',
      'Giới tính': 'Nam',
      'Ngày sinh': '07/11/2004',
      'Lớp học': 'DH22TIN06'
    },
    {
      'STT': 3,
      'Mã sinh viên': '223463',
      'Họ đệm': 'Nguyễn Văn',
      'Tên': 'Bảo',
      'Giới tính': 'Nam',
      'Ngày sinh': '15/12/2004',
      'Lớp học': 'DH22TIN06'
    }
  ]

  // Validate data based on rules
  const validateData = (data) => {
    const errors = []
    
    data.forEach((row, index) => {
      Object.keys(validationRules).forEach(field => {
        const rules = validationRules[field]
        const value = row[field]
        
        if (rules.required && (!value || value.toString().trim() === '')) {
          errors.push({
            row: index + 1,
            field,
            message: `${field} là bắt buộc`
          })
        }
        
        if (rules.type === 'email' && value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(value)) {
            errors.push({
              row: index + 1,
              field,
              message: `${field} không đúng định dạng email`
            })
          }
        }
        
        if (rules.type === 'number' && value && isNaN(value)) {
          errors.push({
            row: index + 1,
            field,
            message: `${field} phải là số`
          })
        }
        
        if (rules.maxLength && value && value.toString().length > rules.maxLength) {
          errors.push({
            row: index + 1,
            field,
            message: `${field} không được vượt quá ${rules.maxLength} ký tự`
          })
        }
      })
    })
    
    return errors
  }

  // Process Excel file
  const processFile = useCallback((file) => {
    setIsLoading(true)
    setErrors([])
    
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
        
        if (jsonData.length === 0) {
          setErrors([{ row: 0, field: 'file', message: 'File Excel trống' }])
          setIsLoading(false)
          return
        }
        
        // Get headers from first row
        const headers = jsonData[0]
        
        // Convert data to objects
        const dataRows = jsonData.slice(1).map((row, index) => {
          const obj = {}
          headers.forEach((header, colIndex) => {
            obj[header] = row[colIndex] || ''
          })
          return obj
        }).filter(row => Object.values(row).some(val => val !== '')) // Remove empty rows
        
        // Transform data based on actual Excel structure
        const transformedData = dataRows.map((row, index) => {
          // Debug: Log the row structure
          console.log('Processing row:', row)
          console.log('Available columns:', Object.keys(row))
          
          // Check if this is student data (has student code)
          if (row['Mã sinh viên'] || row['student_code'] || row['Thông tin sinh viên']) {
            // Format: STT, Mã sinh viên, Họ đệm, Tên, Giới tính, Ngày sinh, Lớp học
            return {
              student_code: row['Mã sinh viên'] || row['student_code'] || row['Thông tin sinh viên'] || '',
              full_name: `${row['Họ đệm'] || row['Họ và tên đệm'] || ''} ${row['Tên'] || ''}`.trim(),
              gender: row['Giới tính'] === 'Nam' ? 'male' : row['Giới tính'] === 'Nữ' ? 'female' : 'other',
              date_of_birth: row['Ngày sinh'] ? formatDate(row['Ngày sinh']) : '',
              class_name: row['Lớp học'] || row['class_name'] || '',
              phone: row['Số điện thoại'] || row['phone'] || '',
              email: row['Email'] || row['email'] || '',
              address: row['Địa chỉ'] || row['address'] || '',
              emergency_contact: row['Người liên hệ'] || row['emergency_contact'] || '',
              emergency_phone: row['SĐT khẩn cấp'] || row['emergency_phone'] || ''
            }
          } 
          // Check if this is class data (has class name)
          else if (row['Tên lớp'] || row['name'] || row['Khối lớp'] || row['grade']) {
            // Format: name, grade, description, max_students (for classes)
            return {
              name: row['Tên lớp'] || row['name'] || '',
              grade: row['Khối lớp'] || row['grade'] || '',
              description: row['Mô tả'] || row['description'] || '',
              max_students: parseInt(row['Số học sinh tối đa'] || row['max_students'] || 40)
            }
          }
          // If no clear format detected, return original row
          else {
            console.log('No clear format detected, returning original row')
            return row
          }
        })
        
        if (transformedData.length > maxRows) {
          setErrors([{ 
            row: 0, 
            field: 'file', 
            message: `File có quá nhiều dòng (${transformedData.length}). Tối đa ${maxRows} dòng.` 
          }])
          setIsLoading(false)
          return
        }
        
        // Validate data
        const validationErrors = validateData(transformedData)
        
        setData(transformedData)
        setErrors(validationErrors)
        setShowPreview(true)
        setIsLoading(false)
        
      } catch (error) {
        setErrors([{ row: 0, field: 'file', message: 'Lỗi đọc file Excel: ' + error.message }])
        setIsLoading(false)
      }
    }
    
    reader.readAsArrayBuffer(file)
  }, [validationRules, maxRows])

  // Helper function to format date
  const formatDate = (dateValue) => {
    if (!dateValue) return ''
    
    // Handle different date formats
    if (typeof dateValue === 'number') {
      // Excel serial date
      const date = new Date((dateValue - 25569) * 86400 * 1000)
      return date.toISOString().split('T')[0]
    }
    
    if (typeof dateValue === 'string') {
      // Handle DD/MM/YYYY format
      const parts = dateValue.split('/')
      if (parts.length === 3) {
        const day = parts[0].padStart(2, '0')
        const month = parts[1].padStart(2, '0')
        const year = parts[2]
        return `${year}-${month}-${day}`
      }
    }
    
    return dateValue
  }

  // Dropzone configuration
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      setFile(file)
      processFile(file)
    }
  }, [processFile])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    multiple: false
  })

  // Download template
  const downloadTemplate = (type = 'classes') => {
    const templateData = type === 'classes' ? sampleClassData : sampleStudentData
    const ws = XLSX.utils.json_to_sheet(templateData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, type === 'classes' ? 'Classes' : 'Students')
    XLSX.writeFile(wb, `template_${type}.xlsx`)
  }

  // Import data
  const handleImport = () => {
    if (errors.length === 0 && data.length > 0) {
      onDataImport(data)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {!showPreview ? (
            <div className="space-y-6">
              {/* Download Templates */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Tải template mẫu</h3>
                <div className="flex space-x-3">
                  <button
                    onClick={() => downloadTemplate('classes')}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Template Lớp học</span>
                  </button>
                  <button
                    onClick={() => downloadTemplate('students')}
                    className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Template Sinh viên</span>
                  </button>
                </div>
              </div>

              {/* Upload Area */}
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? 'border-emerald-400 bg-emerald-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input {...getInputProps()} />
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
                    ) : (
                      <Upload className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  
                  {isDragActive ? (
                    <p className="text-emerald-600">Thả file vào đây...</p>
                  ) : (
                    <div>
                      <p className="text-gray-600">
                        Kéo thả file Excel vào đây hoặc{' '}
                        <span className="text-emerald-600 font-medium">chọn file</span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Hỗ trợ file .xlsx, .xls (tối đa {maxRows} dòng)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* File info */}
              {file && (
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <FileSpreadsheet className="w-8 h-8 text-green-600" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              )}

              {/* Errors */}
              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-900 mb-2">Lỗi import:</h4>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {errors.map((error, index) => (
                      <p key={index} className="text-sm text-red-700">
                        {error.row > 0 ? `Dòng ${error.row}: ` : ''}{error.message}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Preview Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-gray-600" />
                  <h3 className="font-medium text-gray-900">
                    Xem trước dữ liệu ({data.length} dòng)
                  </h3>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Chọn file khác
                </button>
              </div>

              {/* Status Summary */}
              <div className="grid grid-cols-3 gap-4">
                 <div className="bg-green-50 rounded-lg p-3">
                   <div className="flex items-center space-x-2">
                     <CheckCircle className="w-5 h-5 text-green-600" />
                     <span className="text-sm font-medium text-green-900">
                       Hợp lệ: {Math.max(0, data.length - errors.filter(e => e.row > 0).length)}
                     </span>
                   </div>
                 </div>
                 <div className="bg-red-50 rounded-lg p-3">
                   <div className="flex items-center space-x-2">
                     <XCircle className="w-5 h-5 text-red-600" />
                     <span className="text-sm font-medium text-red-900">
                       Lỗi: {errors.filter(e => e.row > 0).length}
                     </span>
                   </div>
                 </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">
                      Tổng: {data.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Data Preview Table */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto max-h-96">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left font-medium text-gray-900 w-16">STT</th>
                        {data[0] && Object.keys(data[0]).map((key) => (
                          <th key={key} className="px-4 py-2 text-left font-medium text-gray-900 min-w-32">
                            {key}
                          </th>
                        ))}
                        <th className="px-4 py-2 text-left font-medium text-gray-900 w-20">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, index) => {
                        const rowErrors = errors.filter(e => e.row === index + 1)
                        const hasError = rowErrors.length > 0
                        
                        return (
                          <tr key={index} className={hasError ? 'bg-red-50' : 'hover:bg-gray-50'}>
                            <td className="px-4 py-2 text-gray-600">{index + 1}</td>
                            {Object.values(row).map((value, colIndex) => (
                              <td key={colIndex} className="px-4 py-2 text-gray-900">
                                {value?.toString() || '-'}
                              </td>
                            ))}
                            <td className="px-4 py-2">
                              {hasError ? (
                                <div className="flex items-center space-x-1">
                                  <XCircle className="w-4 h-4 text-red-500" />
                                  <span className="text-xs text-red-600">Lỗi</span>
                                </div>
                              ) : (
                                <div className="flex items-center space-x-1">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  <span className="text-xs text-green-600">OK</span>
                                </div>
                              )}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Error Details */}
              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-900 mb-2">Chi tiết lỗi:</h4>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {errors.map((error, index) => (
                      <p key={index} className="text-sm text-red-700">
                        Dòng {error.row}, cột "{error.field}": {error.message}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {showPreview && (
          <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
            <button
              onClick={() => setShowPreview(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Quay lại
            </button>
            <button
              onClick={handleImport}
              disabled={errors.length > 0 || data.length === 0}
              className={`px-4 py-2 rounded-lg transition-colors ${
                errors.length > 0 || data.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-emerald-500 text-white hover:bg-emerald-600'
              }`}
            >
              Import {data.length} dòng
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default ExcelImport
