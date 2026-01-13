import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Calendar, Bell, TrendingUp, Shield, Gift, Megaphone } from 'lucide-react';
import { motion } from 'motion/react';

export default function Announcements() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const announcements = [
    {
      id: 1,
      title: "Portal Launch Scheduled for August 16, 2025",
      content: "We're excited to announce that the RubyCon Live Portal will officially launch on August 16, 2025. All holders will gain access to real-time trading, advanced wallet management, and enhanced security features.",
      category: "Platform",
      date: "2024-08-12",
      priority: "high",
      icon: Megaphone,
      featured: true
    },
    {
      id: 2,
      title: "Weekly Payout Distribution Completed",
      content: "This week's payout distribution has been successfully completed. All eligible holders have received their RBQ tokens. Check your dashboard for updated balances and transaction history.",
      category: "Payout",
      date: "2024-08-10",
      priority: "medium",
      icon: TrendingUp
    },
    {
      id: 3,
      title: "Enhanced Security Measures: 2FA Now Mandatory",
      content: "To ensure maximum security for all accounts, Two-Factor Authentication (2FA) is now mandatory for all transactions. Please enable 2FA in your account settings before your next transaction.",
      category: "Security",
      date: "2024-08-08",
      priority: "high",
      icon: Shield
    },
    {
      id: 4,
      title: "Q3 Bonus Distribution Announcement",
      content: "Q3 bonus distribution will begin next week with an additional 15% bonus for holders with 90+ day tenure. Eligible holders will receive automatic bonus credits to their accounts.",
      category: "Bonus",
      date: "2024-08-05",
      priority: "medium",
      icon: Gift
    },
    {
      id: 5,
      title: "System Maintenance: August 20, 2024",
      content: "Scheduled maintenance window on August 20, 2024, from 2:00 AM to 4:00 AM IST. Portal access may be limited during this time. All transactions will resume normal processing after maintenance.",
      category: "Technical",
      date: "2024-08-03",
      priority: "low",
      icon: Bell
    },
    {
      id: 6,
      title: "New Partnership with Leading Exchange",
      content: "RubyCon has signed a strategic partnership with a major cryptocurrency exchange for future listing opportunities. This partnership will enhance liquidity and trading options for RBQ holders.",
      category: "Partnership",
      date: "2024-07-30",
      priority: "medium",
      icon: TrendingUp
    },
    {
      id: 7,
      title: "KYC Verification Process Updated",
      content: "We've streamlined our KYC verification process to make it faster and more user-friendly. New verification requests will now be processed within 24 hours instead of 72 hours.",
      category: "Platform",
      date: "2024-07-25",
      priority: "low",
      icon: Shield
    },
    {
      id: 8,
      title: "Mobile App Development in Progress",
      content: "Development of the RubyCon mobile application is underway. The app will provide full portfolio management, real-time notifications, and secure trading capabilities on the go.",
      category: "Platform",
      date: "2024-07-20",
      priority: "medium",
      icon: Megaphone
    }
  ];

  const categories = ['all', 'Platform', 'Payout', 'Security', 'Bonus', 'Technical', 'Partnership'];

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || announcement.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Platform': return 'bg-blue-100 text-blue-800';
      case 'Payout': return 'bg-green-100 text-green-800';
      case 'Security': return 'bg-red-100 text-red-800';
      case 'Bonus': return 'bg-purple-100 text-purple-800';
      case 'Technical': return 'bg-gray-100 text-gray-800';
      case 'Partnership': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
            Announcements & Updates
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay informed with the latest news, updates, and important announcements 
            from the RubyCon ecosystem.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="flex flex-col md:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Featured Announcement */}
        {filteredAnnouncements.find(a => a.featured) && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {filteredAnnouncements
              .filter(announcement => announcement.featured)
              .map(announcement => (
                <Card key={announcement.id} className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground border-primary/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                          <announcement.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <Badge className="bg-primary-foreground/20 text-primary-foreground mb-2">
                            Featured
                          </Badge>
                          <CardTitle className="text-xl">{announcement.title}</CardTitle>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 text-sm opacity-90">
                          <Calendar className="w-4 h-4" />
                          <span>{announcement.date}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-primary-foreground/90">{announcement.content}</p>
                  </CardContent>
                </Card>
              ))}
          </motion.div>
        )}

        {/* Announcements List */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {filteredAnnouncements
            .filter(announcement => !announcement.featured)
            .map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <announcement.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getCategoryColor(announcement.category)}>
                              {announcement.category}
                            </Badge>
                            <Badge className={getPriorityColor(announcement.priority)}>
                              {announcement.priority.toUpperCase()}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{announcement.date}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{announcement.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </motion.div>

        {filteredAnnouncements.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No announcements found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}