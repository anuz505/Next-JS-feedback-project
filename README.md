# 💬 Feedback App

> **Your voice matters.** A modern, real-time feedback collection platform built with Next.js 15, Prisma, and PostgreSQL.

## 🎯 Internship Project

This application was developed as part of an internship project to demonstrate proficiency in modern full-stack development. It showcases the implementation of a complete feedback management system using industry-standard tools and best practices.

## ✨ What is this?

Ever wanted to capture what your users _really_ think? This is a full-stack feedback application that lets users submit, view, update, and delete feedback with **ratings and descriptions**. Perfect for product teams, event organizers, or anyone who values honest opinions.

### 🎯 Key Features

- **⚡ Real-time Updates** - Powered by TanStack Query for instant UI feedback
- **🎨 Beautiful UI** - Clean, responsive design that works on any device
- **🔄 Full CRUD Operations** - Create, read, update, and delete feedback seamlessly
- **⭐ Star Ratings** - 1-5 star rating system for quick sentiment analysis
- **💾 PostgreSQL Database** - Reliable data persistence with Prisma ORM
- **🚀 Production Ready** - Built with Next.js 15 App Router and TypeScript
- **🎭 Type-Safe** - End-to-end TypeScript for rock-solid reliability

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org) (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma with PostgreSQL adapter
- **State Management:** TanStack Query (React Query)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or hosted)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/anuz505/Next-JS-feedback-project.git
   cd feedback
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/feedback_db"
   ```

4. **Run database migrations**

   ```bash
   npx prisma migrate dev
   ```

5. **Generate Prisma Client**

   ```bash
   npx prisma generate
   ```

6. **Start the development server**

   ```bash
   npm run dev
   ```

7. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) 🎉

## 📁 Project Structure

```
feedback/
├── app/
│   ├── api/feedback/        # RESTful API routes
│   ├── components/          # React components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities & Prisma client
│   └── providers/           # Context providers
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Migration history
└── public/                  # Static assets
```

## 🎮 How to Use

1. **Submit Feedback** - Fill out the form with a title, description, and rating
2. **View All Feedback** - See all submitted feedback in a clean card layout
3. **Edit Feedback** - Click edit to modify existing feedback
4. **Delete Feedback** - Remove feedback that's no longer relevant
5. **Rate Experience** - Use the 1-5 star system to express satisfaction

## 🌐 API Endpoints

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| GET    | `/api/feedback`      | Fetch all feedback  |
| POST   | `/api/feedback`      | Create new feedback |
| PUT    | `/api/feedback/[id]` | Update feedback     |
| DELETE | `/api/feedback/[id]` | Delete feedback     |

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add your `DATABASE_URL` environment variable
4. Deploy! 🚀

The app is optimized for Vercel's serverless infrastructure with proper connection pooling for PostgreSQL.

## 🤝 Contributing

Feedback on this feedback app? How meta! 😄

Feel free to open issues or submit pull requests. All contributions are welcome!

## 📝 License

MIT License - feel free to use this project for learning or production.

---

**Built with ❤️ using Next.js** | [Live Demo](#) | [Report Bug](https://github.com/anuz505/Next-JS-feedback-project/issues)
