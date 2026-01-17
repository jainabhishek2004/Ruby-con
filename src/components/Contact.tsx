import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Mail, Phone, MapPin, MessageCircle, Send, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    // Reset form
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Support",
      value: "support@rubyconworld.in",
      description: "General inquiries and support"
    },
    {
      icon: MessageCircle,
      title: "Telegram Community",
      value: "@RubyConOfficial",
      description: "Join our community chat"
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "Within 24 hours",
      description: "Average support response"
    },
    {
      icon: MapPin,
      title: "Business Address",
      value: "Mumbai, Maharashtra, India",
      description: "Registered office location"
    }
  ];

  const managementTeam = [
    {
      name: "Sarah Wilson",
      role: "Customer Success Manager",
      email: "sarah.wilson@rubyconworld.in",
      specialization: "Account Management & KYC"
    },
    {
      name: "David Chen",
      role: "Technical Support Lead",
      email: "david.chen@rubyconworld.in",
      specialization: "Wallet & Transaction Issues"
    },
    {
      name: "Priya Sharma",
      role: "Payout Specialist",
      email: "priya.sharma@rubyconworld.in",
      specialization: "Payouts & Bonus Distributions"
    }
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
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with our team for support, partnerships, or general inquiries. 
            We're here to help you succeed with RubyCon.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Send className="w-5 h-5" />
                  <span>Send us a Message</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="What is this regarding?"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide details about your inquiry..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Contact Details */}
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start space-x-4"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{info.title}</h3>
                      <p className="text-primary font-medium">{info.value}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Management Team */}
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Management Team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {managementTeam.map((manager, index) => (
                  <motion.div 
                    key={index}
                    className="border border-border rounded-lg p-4"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="font-semibold text-foreground">{manager.name}</h3>
                    <p className="text-sm text-primary font-medium">{manager.role}</p>
                    <p className="text-sm text-muted-foreground mb-2">{manager.specialization}</p>
                    <p className="text-sm text-primary">{manager.email}</p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Email Support</span>
                    <span className="text-primary font-medium">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Live Chat</span>
                    <span className="text-primary font-medium">9 AM - 9 PM IST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone Support</span>
                    <span className="text-primary font-medium">Business Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Telegram Community</span>
                    <span className="text-primary font-medium">24/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


