# SearchPrompt

[English](#english) | [Türkçe](#türkçe)

---

# English

SearchPrompt is a Next.js application that allows users to search, create, and interact with AI prompts. It provides a platform for users to share and discover prompts for various AI models.

## Features

- User authentication (email/password and Google sign-in)
- Create and share AI prompts
- Search functionality for finding prompts
- Like/dislike system for prompts
- Responsive design for mobile and desktop

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Firebase Setup](#firebase-setup)
4. [Database Setup](#database-setup)
5. [Usage](#usage)
6. [Deployment](#deployment)
7. [Contributing](#contributing)
8. [License](#license)

## Prerequisites

- Node.js (version 14 or later)
- npm or yarn
- Firebase account
- Vercel account (for deployment and Postgres database)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/gpercem/search-prompts.git
   cd search-prompts
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory. You'll add the Firebase configuration variables to this file after setting up Firebase.

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Firebase Setup

1. Create a Firebase Project:
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Click "Add project" and follow the prompts to create your project.

2. Set Up Firebase Authentication:
   - In the Firebase Console, go to "Authentication" > "Sign-in method".
   - Enable Email/Password and Google sign-in methods.

3. Create a Web App:
   - In "Project settings", add a new web app.
   - Copy the Firebase configuration object.

4. Set Up Firebase Admin SDK:
   - In "Project settings" > "Service Accounts", generate a new private key.
   - Save the JSON file securely.

5. Configure Environment Variables:
   Add the following to your `.env.local` file:

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL=your_client_email
   FIREBASE_PRIVATE_KEY="your_private_key"
   ```

   Replace `your_*` with the actual values from your Firebase configuration and service account JSON.

6. Initialize Firebase in Your App:
   Create `src/firebase/config.js` and `src/firebaseAdmin.js` files to initialize Firebase and Firebase Admin SDK.

## Database Setup

This application uses Vercel's Neon PostgreSQL database. Follow these steps to set up your database:

1. Create a new Postgres database in your Vercel project settings.

2. Once created, you'll receive a connection string. Add this to your `.env.local` file:

   ```
   POSTGRES_URL="your_connection_string_here"
   ```

3. Use the following SQL command to create the `prompts` table in your database:

   ```sql
   CREATE TABLE prompts (
       post_id CHAR(6) PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       prompt TEXT NOT NULL,
       description TEXT,
       likes INT[] DEFAULT '{}',
       dislikes INT[] DEFAULT '{}',
       views INT DEFAULT 0,
       model_name VARCHAR(50),
       author VARCHAR(100) DEFAULT 'anonymous',
       created_at TIMESTAMP DEFAULT NOW(),
       edited_at TIMESTAMP DEFAULT NOW()
   );
   ```

4. (Optional) To add sample data to your database, you can use the following INSERT statement:

   ```sql
   INSERT INTO prompts (post_id, title, prompt, description, model_name) 
   VALUES 
   ('d7a2f5', 'Design a mobile app for task management', 
   'You are tasked with creating a detailed specification for a mobile app focused on task management...', 
   'Develop a comprehensive task management app specification, including UI/UX, features, and integration options.', 
   'ChatGPT-4'),
   // ... (add more sample data as needed)
   ```

Remember to execute these SQL commands in your Vercel Postgres database console or through a database management tool connected to your Vercel Postgres instance.

## Usage

### Authentication

- Click on the "Log in" button in the header to access the authentication page.
- Users can sign up with email/password or use Google sign-in.

### Creating a Prompt

1. Click on the "Create Prompt" button in the header.
2. Fill in the required fields: Title, Prompt Content, Description, and Model Name.
3. Click "Create Prompt" to submit.

### Searching for Prompts

1. Use the search bar on the home page or in the header.
2. Enter keywords related to the prompt you're looking for.
3. Press Enter or click the search icon to view results.

### Interacting with Prompts

- Click on a prompt to view its details.
- Use the like/dislike buttons to rate prompts.
- Share prompts by copying the URL of the prompt page.

## Deployment

This project is designed to be deployed on Vercel. Follow these steps:

1. Push your code to a GitHub repository.
2. Connect your Vercel account to your GitHub account.
3. Import the project from GitHub in the Vercel dashboard.
4. Configure the environment variables in the Vercel project settings.
5. Deploy the project.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

---

# Türkçe

SearchPrompt, kullanıcıların yapay zeka promptlarını arayabildiği, oluşturabildiği ve etkileşimde bulunabildiği bir Next.js uygulamasıdır. Çeşitli yapay zeka modelleri için promptları paylaşmak ve keşfetmek isteyen kullanıcılara bir platform sunar.

## Özellikler

- Kullanıcı kimlik doğrulama (e-posta/şifre ve Google girişi)
- Yapay zeka promptları oluşturma ve paylaşma
- Promptları bulmak için arama işlevi
- Promptlar için beğenme/beğenmeme sistemi
- Mobil ve masaüstü için duyarlı tasarım

## İçindekiler

1. [Ön Koşullar](#ön-koşullar)
2. [Kurulum](#kurulum)
3. [Firebase Kurulumu](#firebase-kurulumu)
4. [Veritabanı Kurulumu](#veritabanı-kurulumu)
5. [Kullanım](#kullanım)
6. [Dağıtım](#dağıtım)
7. [Katkıda Bulunma](#katkıda-bulunma)
8. [Lisans](#lisans)

## Ön Koşullar

- Node.js (sürüm 14 veya üzeri)
- npm veya yarn
- Firebase hesabı
- Vercel hesabı (dağıtım ve Postgres veritabanı için)

## Kurulum

1. Depoyu klonlayın:
   ```
   git clone https://github.com/gpercem/search-prompts.git
   cd search-prompts
   ```

2. Bağımlılıkları yükleyin:
   ```
   npm install
   ```

3. Ortam değişkenlerini ayarlayın:
   Kök dizinde bir `.env.local` dosyası oluşturun. Firebase kurulumundan sonra bu dosyaya Firebase yapılandırma değişkenlerini ekleyeceksiniz.

4. Geliştirme sunucusunu çalıştırın:
   ```
   npm run dev
   ```

5. Uygulamayı görmek için tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## Firebase Kurulumu

1. Bir Firebase Projesi Oluşturun
2. Firebase Kimlik Doğrulamasını Ayarlayın
3. Bir Web Uygulaması Oluşturun
4. Firebase Admin SDK'yı Ayarlayın
5. Ortam Değişkenlerini Yapılandırın
6. Uygulamanızda Firebase'i Başlatın

Ayrıntılı Firebase kurulum talimatları için bu depodaki [FIREBASE_SETUP.md](FIREBASE_SETUP.md) dosyasına bakın.

## Veritabanı Kurulumu

Bu uygulama, Vercel'in Neon PostgreSQL veritabanını kullanmaktadır. Veritabanınızı kurmak için şu adımları izleyin:

1. Vercel proje ayarlarınızda yeni bir Postgres veritabanı oluşturun.

2. Oluşturulduktan sonra, bir bağlantı dizesi alacaksınız. Bunu `.env.local` dosyanıza ekleyin:

   ```
   POSTGRES_URL="bağlantı_dizeniz_buraya"
   ```

3. Veritabanınızda `prompts` tablosunu oluşturmak için aşağıdaki SQL komutunu kullanın:

   ```sql
   CREATE TABLE prompts (
       post_id CHAR(6) PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       prompt TEXT NOT NULL,
       description TEXT,
       likes INT[] DEFAULT '{}',
       dislikes INT[] DEFAULT '{}',
       views INT DEFAULT 0,
       model_name VARCHAR(50),
       author VARCHAR(100) DEFAULT 'anonymous',
       created_at TIMESTAMP DEFAULT NOW(),
       edited_at TIMESTAMP DEFAULT NOW()
   );
   ```

4. (İsteğe bağlı) Veritabanınıza örnek veri eklemek için aşağıdaki INSERT ifadesini kullanabilirsiniz:

   ```sql
   INSERT INTO prompts (post_id, title, prompt, description, model_name) 
   VALUES 
   ('d7a2f5', 'Görev yönetimi için mobil uygulama tasarımı', 
   'Görev yönetimine odaklanan bir mobil uygulama için detaylı bir şartname oluşturmakla görevlendirildiniz...', 
   'UI/UX, özellikler ve entegrasyon seçenekleri dahil kapsamlı bir görev yönetimi uygulaması şartnamesi geliştirin.', 
   'ChatGPT-4'),
   // ... (gerektiği kadar örnek veri ekleyin)
   ```

Bu SQL komutlarını Vercel Postgres veritabanı konsolunuzda veya Vercel Postgres örneğinize bağlı bir veritabanı yönetim aracı aracılığıyla çalıştırmayı unutmayın.

## Kullanım

### Kimlik Doğrulama

- Kimlik doğrulama sayfasına erişmek için başlıktaki "Giriş Yap" düğmesine tıklayın.
- Kullanıcılar e-posta/şifre ile kaydolabilir veya Google girişi kullanabilir.

### Prompt Oluşturma

1. Başlıktaki "Prompt Oluştur" düğmesine tıklayın.
2. Gerekli alanları doldurun: Başlık, Prompt İçeriği, Açıklama ve Model Adı.
3. Göndermek için "Prompt Oluştur"a tıklayın.

### Promptları Arama

1. Ana sayfadaki veya başlıktaki arama çubuğunu kullanın.
2. Aradığınız promptla ilgili anahtar kelimeleri girin.
3. Sonuçları görmek için Enter tuşuna basın veya arama simgesine tıklayın.

### Promptlarla Etkileşim

- Ayrıntılarını görmek için bir prompta tıklayın.
- Promptları değerlendirmek için beğenme/beğenmeme düğmelerini kullanın.
- Prompt sayfasının URL'sini kopyalayarak promptları paylaşın.

## Dağıtım

Bu proje Vercel'de dağıtılmak üzere tasarlanmıştır. Şu adımları izleyin:

1. Kodunuzu bir GitHub deposuna gönderin.
2. Vercel hesabınızı GitHub hesabınıza bağlayın.
3. Vercel kontrol panelinde GitHub'dan projeyi içe aktarın.
4. Vercel proje ayarlarında ortam değişkenlerini yapılandırın.
5. Projeyi dağıtın.

## Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen bir Pull Request göndermekten çekinmeyin.

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır.
