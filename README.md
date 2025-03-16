# Oil Refinery Platform

![Screenshot 2025-03-16 131327](https://github.com/user-attachments/assets/491bcb19-7e7a-4036-be90-bd15b6bc8d47)

## Overview

This is an interactive 3D visualization demo for an oil refinery platform, designed to showcase the potential of a larger-scale industrial monitoring system. The demo provides a realistic preview of how a comprehensive oil refinery monitoring and management system could function.

## Features

- **3D Interactive Platform Visualization**: Built using React Three Fiber and Three.js
- **Real-time Asset Monitoring**: Visual status indicators for different platform sections
- **Component-wise Health Scoring**: Numerical scoring system for platform components
- **Responsive Interface**: Adaptive layout with intuitive navigation
- **Asset Details Panel**: Detailed information display for selected components
- **Dynamic Camera Controls**: Flexible viewing angles and zoom capabilities

## Key Components

- **Main Deck**: Primary operational area overview
- **Process Areas**: Visualization of processing zones with status indicators
- **Utility Areas**: Support system monitoring
- **Living Quarters**: Personnel areas visualization
- **Helideck**: Aviation facility monitoring
- **Platform Crane**: Equipment status tracking
- **Flare Stack**: Safety system visualization

## Technical Stack

- **Frontend Framework**: React 18
- **3D Rendering**:
  - Three.js
  - @react-three/fiber
  - @react-three/drei
  - @react-three/postprocessing
- **UI Components**:
  - TailwindCSS
  - FontAwesome icons
  - Lucide React
- **Development Tools**:
  - Vite
  - ESLint
  - PostCSS
  - Autoprefixer

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone https://github.com/abdulrehmanwaseem/Oil-Refinery-Platform
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

## Usage

- Use mouse controls to navigate the 3D environment
- Click on different platform components to view detailed information
- Monitor real-time status indicators and health scores
- Use the sidebar panels for detailed component information and navigation

## Project Structure

```
src/
├── components/     # React components
├── data/          # Asset and configuration data
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
└── App.jsx        # Main application component
```

## Development

This demo is built with scalability in mind, serving as a foundation for a larger industrial monitoring system. The modular architecture allows for easy expansion and integration of additional features.

## Performance Considerations

- Optimized 3D model loading
- Efficient state management
- Responsive design for various screen sizes
- Suspense and lazy loading for better user experience

## Future Enhancements

- Real-time data integration
- Advanced analytics dashboard
- Maintenance scheduling system
- Alert and notification system
- Historical data tracking
- Mobile responsiveness improvements

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
