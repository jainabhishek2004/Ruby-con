import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Shield, Target, Eye, TrendingUp, Users, Globe, Zap, Lock } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  const milestones = [
    { phase: "Pre-Launch", date: "Q1 2024", status: "completed", description: "Token development and initial holder onboarding" },
    { phase: "Portal Launch", date: "Aug 16, 2025", status: "upcoming", description: "Live dashboard and trading functionality" },
    { phase: "Exchange Listing", date: "Q4 2025", status: "planned", description: "Major cryptocurrency exchange partnerships" },
    { phase: "Ecosystem Expansion", date: "Q1 2026", status: "planned", description: "DeFi integrations and utility expansion" }
  ];

  const securityFeatures = [
    { icon: Shield, title: "Multi-Signature Security", description: "Advanced wallet protection with multiple authorization layers" },
    { icon: Lock, title: "2FA Authentication", description: "Two-factor authentication for all account access" },
    { icon: Zap, title: "Real-time Monitoring", description: "24/7 security monitoring and fraud detection" },
    { icon: Globe, title: "Regulatory Compliance", description: "Full compliance with international financial regulations" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About RubyCon
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building the future of decentralized finance through transparency, 
            security, and community-driven innovation.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-6 h-6 text-primary" />
                <span>Our Mission</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To democratize access to decentralized finance by creating a secure, 
                transparent, and user-friendly ecosystem that empowers individuals to 
                take control of their financial future through innovative blockchain technology.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-6 h-6 text-primary" />
                <span>Our Vision</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To become the leading platform for transparent cryptocurrency investments, 
                fostering a global community where every participant benefits from 
                fair distribution, secure transactions, and sustainable growth.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Roadmap */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Development Roadmap
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <Card 
                key={index} 
                className={`bg-card/80 backdrop-blur-sm transition-all hover:scale-105 ${
                  milestone.status === 'completed' ? 'border-green-500/50' :
                  milestone.status === 'upcoming' ? 'border-primary/50' : 'border-border'
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{milestone.phase}</CardTitle>
                    <Badge 
                      variant={
                        milestone.status === 'completed' ? 'default' :
                        milestone.status === 'upcoming' ? 'secondary' : 'outline'
                      }
                      className={
                        milestone.status === 'completed' ? 'bg-green-100 text-green-800' :
                        milestone.status === 'upcoming' ? 'bg-primary text-primary-foreground' : ''
                      }
                    >
                      {milestone.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-primary font-medium">{milestone.date}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Security Commitment */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Security Commitment
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your security is our top priority. We implement industry-leading 
              security measures to protect your assets and personal information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
                  <CardContent className="pt-6 text-center">
                    <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Company Overview */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-6 h-6 text-primary" />
                <span>Community First</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Built by the community, for the community. Every decision is made 
                with our holders' best interests in mind, ensuring fair and 
                transparent operations.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                <span>Sustainable Growth</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our tokenomics are designed for long-term sustainability, 
                ensuring steady growth and regular returns for our dedicated 
                token holders.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-primary" />
                <span>Proven Track Record</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Since our inception, we've consistently delivered on our promises, 
                maintaining transparency and building trust within our growing 
                ecosystem.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}