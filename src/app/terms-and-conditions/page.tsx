
export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 md:py-24">
      <div className="max-w-none">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Terms and Conditions</h1>
        <p className="text-muted-foreground mt-2">Effective Date: January 16, 2026</p>

        <h2 className="font-headline text-2xl font-bold tracking-tighter mt-10 mb-4 sm:text-3xl">1. Agreement to Terms</h2>
        <p>By accessing or using the Telegram Bot provided by Techicious Innovations Private Limited ("Company," "we," "us," or "our"), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the Bot.</p>

        <h2 className="font-headline text-2xl font-bold tracking-tighter mt-10 mb-4 sm:text-3xl">2. Description of Service</h2>
        <p>The Bot provides an interface to manage your Google Calendar via Telegram. This includes, but is not limited to:</p>
        <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
            <li>Viewing scheduled events.</li>
            <li>Creating, updating, or deleting calendar entries.</li>
            <li>Receiving automated notifications.</li>
        </ul>

        <h2 className="font-headline text-2xl font-bold tracking-tighter mt-10 mb-4 sm:text-3xl">3. Account Security</h2>
        <p>You are responsible for the security of your Telegram account and the Google account connected to this service.</p>
        <p className="mt-4">You agree to notify us immediately of any unauthorized use of your account.</p>
        <p className="mt-4">We are not liable for any loss or damage arising from your failure to protect your login credentials.</p>

        <h2 className="font-headline text-2xl font-bold tracking-tighter mt-10 mb-4 sm:text-3xl">4. Google API Integration & User Data</h2>
        <p>Your use of this Bot requires granting access to your Google Calendar data.</p>
        <p className="mt-4">We access this data strictly to perform the actions you command via the Bot.</p>
        <p className="mt-4">Our use of data received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements.</p>

        <h2 className="font-headline text-2xl font-bold tracking-tighter mt-10 mb-4 sm:text-3xl">5. Prohibited Activities</h2>
        <p>You agree not to use the Bot to:</p>
        <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
            <li>Violate any local, state, national, or international law.</li>
            <li>Send spam or unsolicited messages via the calendar invite system.</li>
            <li>Attempt to reverse engineer or disrupt the Bot's infrastructure.</li>
        </ul>
        
        <h2 className="font-headline text-2xl font-bold tracking-tighter mt-10 mb-4 sm:text-3xl">6. Limitation of Liability</h2>
        <p>To the maximum extent permitted by law, Techicious Innovations Private Limited shall not be liable for any indirect, incidental, or consequential damages, including loss of data or profits, arising from:</p>
        <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
            <li>Errors or inaccuracies in the Bot's performance.</li>
            <li>Any unauthorized access to or use of our servers and/or personal information stored therein.</li>
            <li>Interruptions or cessation of service from third-party platforms (Google or Telegram).</li>
        </ul>

        <h2 className="font-headline text-2xl font-bold tracking-tighter mt-10 mb-4 sm:text-3xl">7. Disclaimer of Warranties</h2>
        <p>The service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties that the Bot will be error-free or that access will be continuous or uninterrupted.</p>

        <h2 className="font-headline text-2xl font-bold tracking-tighter mt-10 mb-4 sm:text-3xl">8. Governing Law</h2>
        <p>These Terms shall be governed by and defined at the laws of India. You irrevocably consent that the courts of New Delhi shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.</p>
        
        <h2 className="font-headline text-2xl font-bold tracking-tighter mt-10 mb-4 sm:text-3xl">9. Contact Information</h2>
        <p>For any legal inquiries, please contact: Techicious Innovations Private Limited Address: W-116A/103, T Hut, HMB Sardar Patel Camp, Jwala Puri, New Delhi, 110087. Email: <a href="mailto:umesh@techicious.com" className="text-primary hover:underline">umesh@techicious.com</a></p>
      </div>
    </div>
  );
}
