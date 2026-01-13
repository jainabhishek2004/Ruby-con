import React from 'react';
import { useRubyCon } from './RubyConContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import { Coins, TrendingUp, Users, Calendar, DollarSign, Percent } from 'lucide-react';
import { motion } from 'motion/react';

export default function Tokenomics() {
  const { rbqRate } = useRubyCon();
  const tokenDistribution = [
    { name: 'Community Holders', value: 40, color: '#AA0114' },
    { name: 'Development Fund', value: 25, color: '#D41E3A' },
    { name: 'Marketing & Partnerships', value: 15, color: '#F5F5F5' },
    { name: 'Team & Advisors', value: 10, color: '#1E1E1E' },
    { name: 'Reserve Fund', value: 10, color: '#A0A0A0' }
  ];

  const distributionPhases = [
    { phase: 'Phase 1', tokens: 3000000, price: '₹35.00', status: 'Completed', holders: 5000 },
    { phase: 'Phase 2', tokens: 2500000, price: '₹40.00', status: 'Completed', holders: 4200 },
    { phase: 'Phase 3', tokens: 2000000, price: `₹${rbqRate.toFixed(2)}`, status: 'Current', holders: 3500 },
    { phase: 'Phase 4', tokens: 1500000, price: '₹52.50', status: 'Upcoming', holders: 2500 },
    { phase: 'Phase 5', tokens: 1000000, price: '₹60.00', status: 'Planned', holders: 1800 }
  ];

  const priceHistory = [
    { month: 'Jan', price: 35.00 },
    { month: 'Feb', price: 36.50 },
    { month: 'Mar', price: 38.00 },
    { month: 'Apr', price: 40.00 },
    { month: 'May', price: 41.50 },
    { month: 'Jun', price: 43.00 },
    { month: 'Jul', price: 44.50 },
    { month: 'Aug', price: rbqRate }
  ];

  const useCases = [
    { icon: DollarSign, title: "Staking Rewards", description: "Earn passive income through token staking with competitive APY rates" },
    { icon: TrendingUp, title: "Trading & Exchange", description: "Trade RBQ tokens on major cryptocurrency exchanges" },
    { icon: Users, title: "Governance Voting", description: "Participate in ecosystem decisions and governance proposals" },
    { icon: Percent, title: "Fee Discounts", description: "Reduced transaction fees for RBQ token holders" }
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
            RBQ Tokenomics
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the economic model behind RubyCon's sustainable and 
            community-driven token ecosystem.
          </p>
        </motion.div>

        {/* Token Overview */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Coins className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle>Total Supply</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-bold text-foreground">12,000,000</div>
              <p className="text-sm text-muted-foreground">RBQ Tokens</p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle>Current Price</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-bold text-foreground">₹{rbqRate.toFixed(2)}</div>
              <p className="text-sm text-green-600">+3.45% (24h)</p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle>Total Holders</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-bold text-foreground">15,247</div>
              <p className="text-sm text-muted-foreground">Active Wallets</p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle>Launch Date</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-bold text-foreground">Mar 2024</div>
              <p className="text-sm text-muted-foreground">Genesis Block</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Token Distribution Chart */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Token Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tokenDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {tokenDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {tokenDistribution.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Price History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      formatter={(value) => [`₹${value}`, 'Price']}
                      labelStyle={{ color: '#333' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#AA0114" 
                      strokeWidth={3}
                      dot={{ fill: '#AA0114', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Distribution Phases */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Distribution Phases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {distributionPhases.map((phase, index) => (
              <Card 
                key={index} 
                className={`bg-card/80 backdrop-blur-sm transition-all hover:scale-105 ${
                  phase.status === 'Current' ? 'border-primary/50 ring-2 ring-primary/20' : 'border-border'
                }`}
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{phase.phase}</CardTitle>
                  <Badge 
                    variant={
                      phase.status === 'Completed' ? 'default' :
                      phase.status === 'Current' ? 'secondary' : 'outline'
                    }
                    className={
                      phase.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      phase.status === 'Current' ? 'bg-primary text-primary-foreground' : ''
                    }
                  >
                    {phase.status}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Tokens</p>
                    <p className="font-bold">{(phase.tokens / 1000000).toFixed(1)}M</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-bold text-primary">{phase.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Holders</p>
                    <p className="font-bold">{phase.holders.toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Use Cases */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Token Utility & Use Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
                  <CardContent className="pt-6 text-center">
                    <useCase.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-muted-foreground text-sm">{useCase.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}