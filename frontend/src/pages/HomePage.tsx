import React, { useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import EmailList from '../components/EmailList';
import { MailboxContext } from '../contexts/MailboxContext';
import Container from '../components/Container';

// 添加结构化数据组件
const StructuredData: React.FC = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ZMAIL-24小时匿名邮箱",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CNY"
    },
    "description": "创建临时邮箱地址，接收邮件，无需注册，保护您的隐私安全",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1024"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { 
    mailbox, 
    isLoading, 
    emails, 
    selectedEmail, 
    setSelectedEmail, 
    isEmailsLoading
  } = useContext(MailboxContext);
  
  // 使用ref来跟踪是否已经处理过404错误
  const handlingNotFoundRef = useRef(false);
  
  if (isLoading) {
    return (
      <Container>
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Container>
    );
  }
  
  return (
    <Container>
      <StructuredData />
      <EmailList 
        emails={emails} 
        selectedEmailId={selectedEmail}
        onSelectEmail={setSelectedEmail}
        isLoading={isEmailsLoading}
      />
      
      {/* 介绍内容区域 */}
      <div className="mt-8 space-y-6">
    

        {/* 常见问题 */}
        <section className="bg-card rounded-lg p-6 border">
          <h2 className="text-xl font-semibold mb-4">{t('intro.faq.title')}</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">{t('intro.faq.q1.question')}</h3>
              <p className="text-sm text-muted-foreground">{t('intro.faq.q1.answer')}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">{t('intro.faq.q2.question')}</h3>
              <p className="text-sm text-muted-foreground">{t('intro.faq.q2.answer')}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">{t('intro.faq.q3.question')}</h3>
              <p className="text-sm text-muted-foreground">{t('intro.faq.q3.answer')}</p>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
};

export default HomePage;
