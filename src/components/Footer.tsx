import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import {Link} from '@/i18n/routing';
import {useTranslations} from 'next-intl';

const Footer = () => {
  const t = useTranslations('Footer');
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <Image 
                src="/logo.png" 
                alt="Glodinas Makelaardij" 
                width={200}
                height={60}
                className="h-12 w-auto filter brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              {t('description')}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {t('stats.propertiesSold')}
              </div>
              <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {t('stats.clientSatisfaction')}
              </div>
              <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {t('stats.salesVolume')}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact.title')}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-400" />
                <a href="tel:+31681348551" className="text-gray-300 hover:text-white transition-colors">
                  (6) 81 34 85 51
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-400" />
                <a href="mailto:cihatkaya@glodinas.nl" className="text-gray-300 hover:text-white transition-colors">
                  cihatkaya@glodinas.nl
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">{t('contact.location')}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('services.title')}</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">{t('services.valuation')}</Link></li>
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">{t('services.buyer')}</Link></li>
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">{t('services.seller')}</Link></li>
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">{t('services.investment')}</Link></li>
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">{t('services.analysis')}</Link></li>
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">{t('services.negotiation')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            {t('copyright')}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">{t('links.privacy')}</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">{t('links.terms')}</Link>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{t('links.nvm')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

