# Safe Share AI Dashboard

A comprehensive security incident management and policy enforcement dashboard built with React, TypeScript, and Vite. This application provides real-time monitoring, incident management, policy configuration, and audit capabilities for data sharing security.

## 🚀 Features

### Dashboard
- **Real-time Security Metrics**: Monitor security incidents, policy violations, and system health
- **Interactive Charts**: Visualize data with donut charts, line graphs, and pie charts
- **KPI Tracking**: Track key performance indicators with progress bars and trend indicators
- **Export Capabilities**: Download reports and data exports

### Incident Center
- **Incident Management**: View, filter, and manage security incidents
- **Severity Classification**: Categorize incidents by severity (High, Medium, Low)
- **Entity Detection**: Track sensitive data entities (PAN, Aadhaar, Secrets, Contracts, Email)
- **User Actions**: Handle overrides, masking, and blocking decisions
- **Assignment & Status**: Assign incidents to team members and track resolution status

### Policy Studio
- **Policy Configuration**: Create and manage security policies
- **Rule Logic**: Define entity-based rules with configurable thresholds
- **Scope Management**: Set user, group, and application scopes
- **Version Control**: Track policy versions and changes
- **Status Management**: Activate/deactivate policies

### Users & Endpoints
- **User Management**: Monitor user activities and permissions
- **Endpoint Tracking**: Track data sharing endpoints and configurations
- **Access Control**: Manage user access and authentication

### Reports & Audit
- **Comprehensive Reporting**: Generate detailed security reports
- **Audit Trail**: Track all system activities and changes
- **Export Functionality**: Export data in various formats
- **Historical Analysis**: Analyze trends and patterns over time

### Settings
- **System Configuration**: Configure application settings
- **Integration Management**: Manage external service integrations
- **Notification Settings**: Configure alerts and notifications

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **UI Components**: Radix UI primitives with custom styling
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Chart.js with React integration
- **Routing**: React Router DOM
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **Icons**: Lucide React
- **State Management**: React hooks and local state

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd safe-share
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file with your Supabase credentials
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Build & Deploy

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Production Build
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── audit/          # Audit log components
│   ├── common/         # Shared/common components
│   ├── dashboard/      # Dashboard components
│   ├── incidents/      # Incident management components
│   ├── layout/         # Layout components (sidebar, header)
│   ├── policies/       # Policy management components
│   ├── settings/       # Settings page components
│   ├── ui/            # Reusable UI components
│   └── users/         # User management components
├── data/              # Mock data and constants
├── lib/               # Utility libraries
├── supabase/          # Supabase configuration and API
├── types/             # TypeScript type definitions
├── utils/             # Helper utilities
└── App.tsx            # Main application component
```

## 🔧 Configuration

### Supabase Setup
The application uses Supabase for backend services. Configure your Supabase project:

1. Create a new Supabase project
2. Set up your database schema
3. Configure authentication
4. Update the API configuration in `src/supabase/api.ts`

### Tailwind CSS
The project uses Tailwind CSS for styling. Customize the design system in `tailwind.config.js`.

## 🚀 Deployment

### Netlify (Recommended)
The project includes `netlify.toml` configuration for easy deployment to Netlify:

```bash
npm run build
# Deploy the dist/ folder to Netlify
```

### Other Platforms
The built application can be deployed to any static hosting service:
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Azure Static Web Apps

## 📊 Data Models

### Incident
- Security incidents with severity levels
- Entity detection and classification
- User actions and decisions
- Policy violations and overrides

### Policy
- Security policies with rule logic
- Entity-based thresholds
- Scope and exception management
- Version control and status tracking

### User & Endpoint
- User management and permissions
- Endpoint configuration and monitoring
- Access control and authentication

## 🔒 Security Features

- **Data Classification**: Automatic detection of sensitive data types
- **Policy Enforcement**: Configurable rules for data sharing
- **Incident Response**: Streamlined incident management workflow
- **Audit Trail**: Comprehensive logging of all activities
- **Access Control**: Role-based permissions and user management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Contact the development team

---

Built with ❤️ using React, TypeScript, and modern web technologies.
