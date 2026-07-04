
export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 md:py-24">
      <div className="max-w-none">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Privacy Policy</h1>
        <p className="text-muted-foreground mt-2">Effective Date: January 16, 2026</p>
        
        <h2 className="font-headline text-2xl font-bold tracking-tighter mt-10 mb-4 sm:text-3xl">1. Introduction</h2>
        <p>This Privacy Policy describes how Techicious Innovations Private Limited ("we", "us") handles data for our Telegram Bot service ("the Bot"). By connecting your Google Calendar to the Bot, you agree to the collection and use of information in accordance with this policy.</p>
        
        <h2 className="font-headline text-2xl font-bold tracking-tighter mt-10 mb-4 sm:text-3xl">2. Data We Access (Google Calendar)</h2>
        <p>To manage your schedule, our Bot requests access to your Google Calendar via OAuth2. We access:</p>
        <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
          <li><strong>Calendar Events:</strong> To list, create, edit, and delete events as per your commands.</li>
          <li><strong>Email Address:</strong> To identify your account and associate it with your Telegram ID.</li>
        </ul>

        <h2 className="font-headline text-2xl font-bold tracking-tighter mt-10 mb-4 sm:text-3xl">3. How We Use Data Within Telegram</h2>
        <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
          <li><strong>In-Chat Display:</strong> The Bot will transmit event details (titles, times, locations) into your private Telegram chat or designated group to provide the service.</li>
          <li><strong>Command Processing:</strong> We process your text commands via Telegram's servers to execute actions on your Google Calendar.</li>
          <li><strong>Data Caching:</strong> We may temporarily cache event data to improve Bot performance, but we do not store your full calendar history on our servers.</li>
        </ul>

        <h2 className="font-headline text-2xl font-bold tracking-tighter mt-10 mb-4 sm:text-3xl">4. Google API Limited Use Disclosure</h2>
        <p>Techicious Innovations Private Limited’s use and transfer of information received from Google APIs to any other app (including the Telegram platform) will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>, including the Limited Use requirements.</p>
        <p className="mt-4"><em>Note for Google Reviewers: We use the Telegram Bot API as a transit layer to deliver calendar management features to the user. We do not share Google User Data with Telegram for any purpose other than displaying it to the user within the Bot interface.</em></p>

        <h2 className="font-headline text-2xl font-bold tracking-tighter mt-10 mb-4 sm:text-3xl">5. Data Security & Retention</h2>
        <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
          <li><strong>Encryption:</strong> Data in transit between Google, our servers, and Telegram is encrypted using industry-standard SSL/TLS.</li>
          <li><strong>Retention:</strong> We only retain your OAuth refresh tokens (encrypted) to keep the bot connected. We do not store your calendar events permanently.</li>
          <li><strong>Revocation:</strong> You can stop the Bot’s access at any time by sending the /logout command or by visiting <a href="https://myaccount.google.com/connections?filters=3,4&hl=en" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Security Settings</a>.</li>
        </ul>
        
        <h2 className="font-headline text-2xl font-bold tracking-tighter mt-10 mb-4 sm:text-3xl">6. Contact Information</h2>
        <p>Techicious Innovations Private Limited W-116A/103, T Hut, HMB Sardar Patel Camp, Jwala Puri, New Delhi, 110087. Support Email: <a href="mailto:umesh@techicious.com" className="text-primary hover:underline">umesh@techicious.com</a></p>
      </div>
    </div>
  );
}
