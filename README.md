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
4. [Usage](#usage)
5. [Deployment](#deployment)
6. [Contributing](#contributing)
7. [License](#license)

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

1. Create a Firebase Project
2. Set Up Firebase Authentication
3. Create a Web App
4. Set Up Firebase Admin SDK
5. Configure Environment Variables
6. Initialize Firebase in Your App

For detailed Firebase setup instructions, refer to the [FIREBASE_SETUP.md](FIREBASE_SETUP.md) file in this repository.

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
4. [Kullanım](#kullanım)
5. [Dağıtım](#dağıtım)
6. [Katkıda Bulunma](#katkıda-bulunma)
7. [Lisans](#lisans)

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

Pull Request göndermekten çekinmeyin.

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır.
