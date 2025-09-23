import { motion } from 'framer-motion'
import {
    CheckCircle,
    Download,
    FileSpreadsheet,
    Server,
    Upload,
    X,
    XCircle
} from 'lucide-react'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import * as XLSX from 'xlsx'

const DjangoExcelImport = ({ 
  onDataImport, 
  onClose, 
  title = "Import từ Excel",
  importType = 'students' // 'students' or 'classes'
}) => {
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

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
    }
  ]

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
    }
  ]

  // Download template
  const downloadTemplate = () => {
    const templateData = importType === 'students' ? sampleStudentData : sampleClassData
    const ws = XLSX.utils.json_to_sheet(templateData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, importType === 'students' ? 'Students' : 'Classes')
    XLSX.writeFile(wb, `template_${importType}.xlsx`)
  }

  // Process file with Django backend
  const processFile = useCallback(async (file) => {
    setIsLoading(true)
    setError(null)
    setResult(null)
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', importType)
      
      const response = await fetch('http://localhost:8000/api/import-excel/', {
        method: 'POST',
        body: formData,
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setResult(data)
        if (onDataImport) {
          onDataImport(data)
        }
      } else {
        setError(data.error || 'Có lỗi xảy ra khi import file')
      }
    } catch (error) {
      setError('Lỗi kết nối: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }, [importType, onDataImport])

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Server className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="space-y-6">
            {/* Download Template */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">Tải template mẫu</h3>
              <button
                onClick={downloadTemplate}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                <span>Template {importType === 'students' ? 'Sinh viên' : 'Lớp học'}</span>
              </button>
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
                      Hỗ trợ file .xlsx, .xls
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

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
                <p className="text-gray-600 mt-2">Đang xử lý file...</p>
              </div>
            )}

            {/* Success Result */}
            {result && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h4 className="font-medium text-green-900">Import thành công!</h4>
                </div>
                <div className="text-sm text-green-700">
                  <p>Đã import {result.count || 0} {importType === 'students' ? 'sinh viên' : 'lớp học'}</p>
                  {result.message && <p className="mt-1">{result.message}</p>}
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <h4 className="font-medium text-red-900">Lỗi import</h4>
                </div>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Đóng
          </button>
          {result && (
            <button
              onClick={() => {
                setResult(null)
                setFile(null)
                setError(null)
              }}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Import tiếp
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default DjangoExcelImport
