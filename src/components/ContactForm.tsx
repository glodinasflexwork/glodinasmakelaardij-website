import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Send, Check } from 'lucide-react';

interface ContactFormProps {
  language?: 'nl' | 'en';
}

const ContactForm: React.FC<ContactFormProps> = ({ language = 'nl' }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    reason: '',
    consent: false,
    newsletter: false,
  });
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Translations
  const translations = {
    nl: {
      title: 'Neem contact met ons op',
      subtitle: 'Vul het formulier in en we nemen zo snel mogelijk contact met u op.',
      name: 'Naam',
      email: 'E-mailadres',
      phone: 'Telefoonnummer',
      subject: 'Onderwerp',
      message: 'Bericht',
      reason: 'Reden van contact',
      reasonOptions: {
        general: 'Algemene vraag',
        buying: 'Woning kopen',
        selling: 'Woning verkopen',
        valuation: 'Woningtaxatie',
        viewing: 'Bezichtiging plannen',
        other: 'Anders',
      },
      consent: 'Ik ga akkoord met de verwerking van mijn gegevens volgens de privacyverklaring.',
      newsletter: 'Ik wil graag de nieuwsbrief ontvangen met de laatste woningaanbiedingen.',
      submit: 'Versturen',
      submitting: 'Bezig met versturen...',
      success: 'Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.',
      error: 'Er is iets misgegaan. Probeer het later opnieuw of neem telefonisch contact op.',
      required: 'Dit veld is verplicht',
      invalidEmail: 'Voer een geldig e-mailadres in',
    },
    en: {
      title: 'Contact us',
      subtitle: 'Fill out the form and we will get back to you as soon as possible.',
      name: 'Name',
      email: 'Email address',
      phone: 'Phone number',
      subject: 'Subject',
      message: 'Message',
      reason: 'Reason for contact',
      reasonOptions: {
        general: 'General inquiry',
        buying: 'Buying a property',
        selling: 'Selling a property',
        valuation: 'Property valuation',
        viewing: 'Schedule a viewing',
        other: 'Other',
      },
      consent: 'I agree to the processing of my data according to the privacy policy.',
      newsletter: 'I would like to receive the newsletter with the latest property offers.',
      submit: 'Submit',
      submitting: 'Submitting...',
      success: 'Thank you for your message! We will get back to you as soon as possible.',
      error: 'Something went wrong. Please try again later or contact us by phone.',
      required: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
    }
  };

  const t = translations[language];
  
  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t.required;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t.required;
    }
    
    if (!formData.reason) {
      newErrors.reason = t.required;
    }
    
    if (!formData.consent) {
      newErrors.consent = t.required;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  // Handle select changes
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, reason: value }));
    
    // Clear error when field is edited
    if (errors.reason) {
      setErrors(prev => ({ ...prev, reason: '' }));
    }
  };
  
  // Handle checkbox changes
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Set submitting state
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form and show success message
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        reason: '',
        consent: false,
        newsletter: false,
      });
      setIsSubmitted(true);
    } catch (err) {
      setError(t.error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // If form is successfully submitted, show success message
  if (isSubmitted) {
    return (
      <div className="bg-white rounded-lg border p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold mb-2">{t.success}</h3>
        <p className="text-gray-600 mb-6">
          {language === 'nl' ? 
            'We hebben uw bericht ontvangen en zullen binnen 24 uur reageren.' : 
            'We have received your message and will respond within 24 hours.'}
        </p>
        <Button 
          variant="cta" 
          onClick={() => setIsSubmitted(false)}
        >
          {language === 'nl' ? 'Nieuw bericht versturen' : 'Send another message'}
        </Button>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-2xl font-bold mb-2">{t.title}</h2>
      <p className="text-gray-600 mb-6">{t.subtitle}</p>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="name" className="mb-2 block">
              {t.name} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="email" className="mb-2 block">
              {t.email} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="phone" className="mb-2 block">
              {t.phone}
            </Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <Label htmlFor="reason" className="mb-2 block">
              {t.reason} <span className="text-red-500">*</span>
            </Label>
            <Select 
              value={formData.reason} 
              onValueChange={handleSelectChange}
            >
              <SelectTrigger className={errors.reason ? 'border-red-500' : ''}>
                <SelectValue placeholder={t.reason} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">{t.reasonOptions.general}</SelectItem>
                <SelectItem value="buying">{t.reasonOptions.buying}</SelectItem>
                <SelectItem value="selling">{t.reasonOptions.selling}</SelectItem>
                <SelectItem value="valuation">{t.reasonOptions.valuation}</SelectItem>
                <SelectItem value="viewing">{t.reasonOptions.viewing}</SelectItem>
                <SelectItem value="other">{t.reasonOptions.other}</SelectItem>
              </SelectContent>
            </Select>
            {errors.reason && (
              <p className="text-red-500 text-sm mt-1">{errors.reason}</p>
            )}
          </div>
          
          <div className="md:col-span-2">
            <Label htmlFor="subject" className="mb-2 block">
              {t.subject}
            </Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
          
          <div className="md:col-span-2">
            <Label htmlFor="message" className="mb-2 block">
              {t.message} <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? 'border-red-500' : ''}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="consent"
              checked={formData.consent}
              onCheckedChange={(checked) => 
                handleCheckboxChange('consent', checked === true)
              }
              className={errors.consent ? 'border-red-500' : ''}
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="consent"
                className={`text-sm font-normal ${errors.consent ? 'text-red-500' : ''}`}
              >
                {t.consent} <span className="text-red-500">*</span>
              </Label>
              {errors.consent && (
                <p className="text-red-500 text-sm">{errors.consent}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox
              id="newsletter"
              checked={formData.newsletter}
              onCheckedChange={(checked) => 
                handleCheckboxChange('newsletter', checked === true)
              }
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="newsletter"
                className="text-sm font-normal"
              >
                {t.newsletter}
              </Label>
            </div>
          </div>
        </div>
        
        <Button 
          type="submit" 
          variant="cta" 
          size="lg" 
          disabled={isSubmitting}
          className="w-full md:w-auto"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              {t.submitting}
            </>
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              {t.submit}
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;

