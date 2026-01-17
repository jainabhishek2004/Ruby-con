import React from 'react';
import { useRubyCon } from './RubyConContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, Shield, Wallet, Users, DollarSign, BarChart3, Lock, Bell, ArrowRight, Zap, Award, Globe, Sparkles, ArrowUpRight, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HomepageProps {
  onPageChange: (page: string) => void;
  onLogin: () => void;
}


export default function Homepage({ onPageChange, onLogin }: HomepageProps) {
  const { rbqRate, getDailyChange, getWeeklyChange } = useRubyCon();
  
  // Get price changes
  const dailyChange = getDailyChange();
  const weeklyChange = getWeeklyChange();
  
  // Mock real-time data - Using dynamic pricing
  const tokenPrice = {
    inr: `₹${rbqRate.toFixed(2)}`,
    usd: `$${(rbqRate * 0.012).toFixed(4)}`,
    eur: `€${(rbqRate * 0.011).toFixed(4)}`,
    change24h: dailyChange.percentage >= 0 ? `+${dailyChange.percentage.toFixed(2)}%` : `${dailyChange.percentage.toFixed(2)}%`,
    change7d: weeklyChange.percentage >= 0 ? `+${weeklyChange.percentage.toFixed(2)}%` : `${weeklyChange.percentage.toFixed(2)}%`,
    isPositive: dailyChange.percentage >= 0
  };

  const keyStats = [
    { label: "Total Holders", value: "15,247", icon: Users, change: "+12.5%", trend: "up" },
    { label: "Market Cap", value: "₹54.2Cr", icon: DollarSign, change: "+8.3%", trend: "up" },
    { label: "24h Volume", value: "₹2.4Cr", icon: BarChart3, change: "+15.7%", trend: "up" },
    { label: "Total Supply", value: "12M RBQ", icon: Globe, change: "Fixed", trend: "neutral" }
  ];

  const features = [
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Military-grade encryption with multi-signature wallets and cold storage protection.",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: TrendingUp,
      title: "Real-Time Analytics",
      description: "Advanced trading charts with live market data and AI-powered insights.",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: Wallet,
      title: "Smart Wallet System",
      description: "Seamless deposits, withdrawals, and automated payout distribution.",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: Lock,
      title: "KYC Verified Platform",
      description: "Full regulatory compliance with verified holder identification and AML checks.",
      gradient: "from-orange-500/20 to-red-500/20"
    },
    {
      icon: Zap,
      title: "Instant Transactions",
      description: "Lightning-fast processing with zero-delay confirmations and low fees.",
      gradient: "from-yellow-500/20 to-amber-500/20"
    },
    {
      icon: Award,
      title: "Reward Programs",
      description: "Weekly payouts, bonus distributions, and exclusive holder benefits.",
      gradient: "from-indigo-500/20 to-violet-500/20"
    }
  ];

  const announcements = [
    "🚀 Portal Launch scheduled for Aug 16, 2025",
    "💰 Weekly payout distribution completed - Check your dashboard",
    "🔒 New security features: 2FA now mandatory for all transactions",
    "🎁 Q3 bonus distribution starting next week - 15% extra rewards",
    "📈 RBQ token listed on major exchanges - Trading volume up 150%"
  ];

  // Floating orbs animation
  const floatingOrbs = [
    { size: 400, x: -100, y: -100, delay: 0, duration: 20 },
    { size: 300, x: 500, y: 200, delay: 2, duration: 25 },
    { size: 250, x: -50, y: 300, delay: 4, duration: 30 },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingOrbs.map((orb, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl"
            style={{
              width: orb.size,
              height: orb.size,
              left: `${orb.x}px`,
              top: `${orb.y}px`,
            }}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -50, 100, 0],
              scale: [1, 1.2, 0.8, 1],
              opacity: [0.3, 0.5, 0.3, 0.3]
            }}
            transition={{
              duration: orb.duration,
              delay: orb.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Announcement Ticker */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground py-3 overflow-hidden relative z-10 border-b border-primary-foreground/10">
        <motion.div 
          className="flex space-x-12"
          animate={{ x: [-2000, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...announcements, ...announcements, ...announcements].map((announcement, index) => (
            <span key={index} className="whitespace-nowrap flex items-center space-x-2 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>{announcement}</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Premium Crypto Ecosystem</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  RubyCon
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Experience the future of decentralized finance with secure transactions, 
                transparent payouts, and real-time portfolio management.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button 
                  onClick={onLogin}
                  size="lg" 
                  className="text-lg px-8 py-6 group"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Access Dashboard
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  onClick={() => onPageChange('about')}
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-6 group"
                >
                  Explore More
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-primary" />
                  <span>Bank-Grade Security</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>KYC Verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-primary" />
                  <span>15K+ Holders</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Price Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-card via-card to-card/50 backdrop-blur-xl border-primary/20 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
                
                <CardHeader className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-2xl">RBQ Token</CardTitle>
                    <Badge 
                      variant={tokenPrice.isPositive ? "default" : "destructive"}
                      className="text-sm px-3 py-1"
                    >
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {tokenPrice.change24h}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Live Market Price</p>
                </CardHeader>

                <CardContent className="relative space-y-6">
                  {/* Main Price */}
                  <div className="space-y-2">
                    <motion.div 
                      className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
                      key={rbqRate}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                    >
                      {tokenPrice.inr}
                    </motion.div>
                    <div className="text-muted-foreground space-x-3">
                      <span>{tokenPrice.usd}</span>
                      <span>•</span>
                      <span>{tokenPrice.eur}</span>
                    </div>
                  </div>

                  {/* Price Chart Mockup */}
                  <div className="h-32 bg-secondary/50 rounded-lg p-4 relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0">
                      <svg width="100%" height="80" viewBox="0 0 300 80" preserveAspectRatio="none">
                        <motion.path
                          d="M 0 60 Q 50 40, 75 45 T 150 30 T 225 35 T 300 20"
                          stroke="url(#gradient)"
                          strokeWidth="3"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#AA0114" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#AA0114" stopOpacity="1" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="absolute top-4 left-4 space-y-1">
                      <div className="text-xs text-muted-foreground">7 Day Change</div>
                      <div className="text-sm font-semibold text-primary">{tokenPrice.change7d}</div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button onClick={onLogin} className="w-full" variant="outline">
                      <Wallet className="w-4 h-4 mr-2" />
                      View Wallet
                    </Button>
                    <Button onClick={() => onPageChange('tokenomics')} className="w-full">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Tokenomics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {keyStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="relative overflow-hidden bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.trend === 'up' ? 'from-green-500/5' : stat.trend === 'down' ? 'from-red-500/5' : 'from-primary/5'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                  
                  <CardContent className="pt-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <stat.icon className="w-10 h-10 text-primary" />
                      <Badge variant="outline" className="text-xs">
                        {stat.change}
                      </Badge>
                    </div>
                    
                    <div className="text-3xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>

                    {/* Progress indicator */}
                    <div className="mt-4 h-1 bg-secondary rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full ${stat.trend === 'up' ? 'bg-green-500' : stat.trend === 'down' ? 'bg-red-500' : 'bg-primary'}`}
                        initial={{ width: 0 }}
                        animate={{ width: stat.trend === 'neutral' ? '100%' : '75%' }}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Live Activity Feed */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Market Overview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="lg:col-span-2"
            >
              <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <span>Market Overview</span>
                    <Badge variant="outline" className="ml-auto">Live</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { label: 'Current Price', value: tokenPrice.inr, subValue: tokenPrice.usd },
                      { label: '24h High', value: `₹${(rbqRate * 1.05).toFixed(2)}`, subValue: 'Peak today' },
                      { label: '24h Low', value: `₹${(rbqRate * 0.95).toFixed(2)}`, subValue: 'Bottom today' },
                      { label: 'Circulating Supply', value: '8.5M RBQ', subValue: '70.8% of total' },
                      { label: 'Total Transactions', value: '234,567', subValue: '+1,234 today' },
                      { label: 'Avg. Hold Time', value: '142 days', subValue: 'Strong holders' },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.05 }}
                        className="p-4 bg-secondary/50 rounded-lg border border-primary/10 hover:border-primary/20 transition-colors"
                      >
                        <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                        <div className="text-lg font-semibold">{item.value}</div>
                        <div className="text-xs text-muted-foreground mt-1">{item.subValue}</div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span>Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { period: '24 Hours', change: tokenPrice.change24h, color: tokenPrice.isPositive ? 'text-green-500' : 'text-red-500' },
                    { period: '7 Days', change: tokenPrice.change7d, color: weeklyChange.percentage >= 0 ? 'text-green-500' : 'text-red-500' },
                    { period: '30 Days', change: '+12.34%', color: 'text-green-500' },
                    { period: 'All Time', change: '+245.67%', color: 'text-green-500' },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.05 }}
                      className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                    >
                      <span className="text-sm text-muted-foreground">{item.period}</span>
                      <span className={`text-sm font-semibold ${item.color}`}>
                        {item.change}
                      </span>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Badge variant="outline" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Platform Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                RubyCon
              </span>
              ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the next generation of decentralized finance with our secure, 
              transparent, and community-driven ecosystem.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className={`h-full relative overflow-hidden bg-gradient-to-br ${feature.gradient} backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 group`}>
                  <div className="absolute inset-0 bg-card/90 group-hover:bg-card/80 transition-all" />
                  
                  <CardContent className="pt-8 pb-6 relative">
                    {/* Icon with gradient background */}
                    <div className="mb-6 relative">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="w-8 h-8 text-primary" />
                      </div>
                      <div className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} blur-xl opacity-50 mx-auto`} />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 text-center">{feature.title}</h3>
                    <p className="text-muted-foreground text-center text-sm leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Hover indicator */}
                    <div className="mt-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm text-primary font-medium">Learn more</span>
                      <ArrowUpRight className="w-4 h-4 ml-1 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      

      {/* CTA Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80" />
        
        {/* Animated pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="space-y-8"
          >
            <div>
              <Badge variant="secondary" className="mb-6">
                <Sparkles className="w-3 h-3 mr-1" />
                Join 15,000+ Holders
              </Badge>
              
              <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                Start Your RubyCon Journey Today
              </h2>
              
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Secure your position in the future of decentralized finance. 
                Experience transparent payouts, real-time tracking, and exclusive holder benefits.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={onLogin}
                size="lg" 
                variant="secondary"
                className="text-lg px-10 py-7 shadow-xl hover:shadow-2xl transition-all group"
              >
                <Shield className="w-5 h-5 mr-2" />
                Access Your Portal
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                onClick={() => onPageChange('tokenomics')}
                size="lg" 
                variant="outline"
                className="text-lg px-10 py-7 bg-white/10 hover:bg-white/20 text-primary-foreground border-primary-foreground/30 hover:border-primary-foreground/50 backdrop-blur-sm"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                View Tokenomics
              </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-primary-foreground/20 mt-12">
              {[
                { value: '₹54.2Cr', label: 'Market Cap' },
                { value: '15,247', label: 'Active Holders' },
                { value: '98.7%', label: 'Uptime' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-primary-foreground/80">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
    
    </div>
  );
}