import { Mail, MessageSquare, Phone, Check } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

const Contact = () => {
  const [contactForm, setContactForm] = useState({ name: '', email: '', school: '', phone: '', message: '' })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const errors = {}
    if (!contactForm.name.trim()) errors.name = 'Vui lòng nhập họ tên'
    if (!contactForm.email.trim()) {
      errors.email = 'Vui lòng nhập email'
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      errors.email = 'Email không hợp lệ'
    }
    if (!contactForm.school.trim()) errors.school = 'Vui lòng nhập tên trường học'
    if (!contactForm.phone.trim()) {
      errors.phone = 'Vui lòng nhập số điện thoại'
    } else if (!/^[0-9+\-\s()]+$/.test(contactForm.phone)) {
      errors.phone = 'Số điện thoại không hợp lệ'
    }
    if (!contactForm.message.trim()) errors.message = 'Vui lòng nhập nội dung tin nhắn'
    return errors
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setContactForm((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      setContactForm({ name: '', email: '', school: '', phone: '', message: '' })
      toast.success('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24h.')
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-card" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="contact-heading" className="text-4xl font-bold text-gray-900 mb-6">Liên hệ với chúng tôi</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Cần hỗ trợ hoặc có câu hỏi? Chúng tôi luôn sẵn sàng giúp!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center" aria-hidden="true">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Điện thoại</h3>
                <p className="text-gray-600">Hotline: 1900 1234</p>
                <p className="text-gray-600">Hỗ trợ: 8:00 - 17:00 (T2-T6)</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center" aria-hidden="true">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">support@sms.edu.vn</p>
                <p className="text-gray-600">Phản hồi trong 24h</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center" aria-hidden="true">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Chat trực tuyến</h3>
                <p className="text-gray-600">Hỗ trợ trực tiếp</p>
                <p className="text-gray-600">8:00 - 17:00 hàng ngày</p>
              </div>
            </div>

            <div className="bg-primary/5 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Tại sao chọn chúng tôi?</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-primary mr-2" /> Hỗ trợ 24/7 cho giáo viên
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-primary mr-2" /> Bảo mật dữ liệu cao
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-primary mr-2" /> Cập nhật miễn phí
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-primary mr-2" /> Đào tạo sử dụng miễn phí
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Gửi tin nhắn</h3>
            <form onSubmit={handleSubmit} className="space-y-6" aria-describedby="contact-required">
              <span id="contact-required" className="sr-only">Các trường có dấu * là bắt buộc.</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Họ và tên *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Nhập họ và tên"
                    aria-invalid={!!formErrors.name}
                    aria-describedby={formErrors.name ? 'name-error' : undefined}
                  />
                  {formErrors.name && <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">{formErrors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="email@truong.edu.vn"
                    aria-invalid={!!formErrors.email}
                    aria-describedby={formErrors.email ? 'email-error' : undefined}
                  />
                  {formErrors.email && <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">{formErrors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-2">Tên trường học *</label>
                  <input
                    type="text"
                    id="school"
                    name="school"
                    value={contactForm.school}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${formErrors.school ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="THPT Nguyễn Du"
                    aria-invalid={!!formErrors.school}
                    aria-describedby={formErrors.school ? 'school-error' : undefined}
                  />
                  {formErrors.school && <p id="school-error" className="mt-1 text-sm text-red-600" role="alert">{formErrors.school}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="0123 456 789"
                    aria-invalid={!!formErrors.phone}
                    aria-describedby={formErrors.phone ? 'phone-error' : undefined}
                  />
                  {formErrors.phone && <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">{formErrors.phone}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Nội dung tin nhắn *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={contactForm.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${formErrors.message ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Mô tả chi tiết về nhu cầu của bạn..."
                  aria-invalid={!!formErrors.message}
                  aria-describedby={formErrors.message ? 'message-error' : undefined}
                />
                {formErrors.message && <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">{formErrors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
                    <span>Đang gửi...</span>
                  </>
                ) : (
                  <>
                    <span>Gửi tin nhắn</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
