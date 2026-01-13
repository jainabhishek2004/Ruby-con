import React, { useState } from 'react';
import { useRubyCon } from './RubyConContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  Download, 
  Upload, 
  Search,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  Database,
  Users,
  TrendingUp,
  AlertCircle,
  Save,
  X,
  Wallet,
  DollarSign,
  Minus,
  RefreshCw,
  Target,
  Settings,
  ShoppingCart
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface WithdrawalRecord {
  id: string;
  holderName: string;
  holderId: string;
  walletAddress: string;
  amount: string;
  inrValue: string;
  transactionHash: string;
  date: string;
  time: string;
  paymentMethod: string;
  status: 'Processed' | 'Pending' | 'Failed';
  notes: string;
  screenshot?: string;
  createdBy: string;
  createdAt: string;
}

export default function AdminPanel() {
  const { 
    rbqRate, 
    setRbqRate, 
    users, 
    addTokensToUser, 
    deductTokensFromUser,
    getAllTransactions,
    formatRBQValue,
    formatINRValue,
    getDailyChange,
    getWeeklyChange,
    getPriceHistory,
    getAllSellOrders,
    cancelSellOrder
  } = useRubyCon();

  // Rate Management State
  const [newRate, setNewRate] = useState(rbqRate.toString());
  const [isUpdatingRate, setIsUpdatingRate] = useState(false);
  
  // Get price changes
  const dailyChange = getDailyChange();
  const weeklyChange = getWeeklyChange();
  const priceHistoryData = getPriceHistory();

  // Wallet Management State
  const [selectedUserId, setSelectedUserId] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  const [transactionReason, setTransactionReason] = useState('');
  const [showWalletDialog, setShowWalletDialog] = useState(false);
  const [transactionType, setTransactionType] = useState<'add' | 'deduct'>('add');

  // Withdrawal Records State
  const [withdrawalRecords, setWithdrawalRecords] = useState<WithdrawalRecord[]>([
    {
      id: "RBQ-WD-20240815-001",
      holderName: "John Doe",
      holderId: "RBC-15247",
      amount: "3,333.00 RBQ",
      inrValue: "₹1,09,156",
      walletAddress: "RBQ1x7F9mK3nP8vQ2wR5tY6uE8dH4jS9cL1aB0",
      transactionHash: "0x7a8f9c2d1e3b4a5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c",
      date: "2024-08-15",
      time: "10:15",
      paymentMethod: "RBQ Wallet",
      status: "Processed",
      notes: "Bonus withdrawal processed successfully",
      createdBy: "Admin",
      createdAt: "2024-08-15 10:30"
    },
    {
      id: "RBQ-WD-20240803-002",
      holderName: "Jane Smith",
      holderId: "RBC-15248",
      amount: "2,200.00 RBQ",
      inrValue: "₹72,050",
      walletAddress: "RBQ5x4M8mN2pQ7wT9yC1uE6dJ4kH8gF2bR3",
      transactionHash: "0x9b1a2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b",
      date: "2024-08-03",
      time: "14:20",
      paymentMethod: "Bank Transfer",
      status: "Processed",
      notes: "Regular withdrawal to bank account",
      createdBy: "Admin",
      createdAt: "2024-08-03 14:30"
    }
  ]);

  const [newRecord, setNewRecord] = useState<Partial<WithdrawalRecord>>({
    holderName: '',
    holderId: '',
    amount: '',
    inrValue: '',
    walletAddress: '',
    transactionHash: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
    paymentMethod: 'RBQ Wallet',
    status: 'Processed',
    notes: ''
  });

  const [showAddRecordDialog, setShowAddRecordDialog] = useState(false);

  // Rate Management Functions
  const handleRateUpdate = () => {
    setIsUpdatingRate(true);
    const rate = parseFloat(newRate);
    
    if (isNaN(rate) || rate <= 0) {
      toast.error('Please enter a valid positive rate');
      setIsUpdatingRate(false);
      return;
    }

    setTimeout(() => {
      setRbqRate(rate);
      setIsUpdatingRate(false);
      toast.success(`RBQ rate successfully updated to ₹${rate.toFixed(2)} per token!`);
    }, 1000);
  };

  // Wallet Management Functions
  const handleWalletTransaction = () => {
    const amount = parseFloat(tokenAmount);
    const user = users.find(u => u.id === selectedUserId);
    
    if (!user) {
      toast.error('Please select a user');
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid positive amount');
      return;
    }

    if (!transactionReason.trim()) {
      toast.error('Please provide a reason for this transaction');
      return;
    }

    if (transactionType === 'add') {
      addTokensToUser(selectedUserId, amount, transactionReason);
    } else {
      deductTokensFromUser(selectedUserId, amount, transactionReason);
    }

    // Reset form
    setSelectedUserId('');
    setTokenAmount('');
    setTransactionReason('');
    setShowWalletDialog(false);
  };

  // Withdrawal Record Functions
  const handleAddRecord = () => {
    if (!newRecord.holderName || !newRecord.holderId || !newRecord.amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    const record: WithdrawalRecord = {
      id: `RBQ-WD-${Date.now()}-${Math.random().toString(36).substr(2, 3)}`,
      holderName: newRecord.holderName!,
      holderId: newRecord.holderId!,
      amount: newRecord.amount!,
      inrValue: newRecord.inrValue || '',
      walletAddress: newRecord.walletAddress || '',
      transactionHash: newRecord.transactionHash || '',
      date: newRecord.date!,
      time: newRecord.time!,
      paymentMethod: newRecord.paymentMethod!,
      status: newRecord.status!,
      notes: newRecord.notes || '',
      createdBy: 'Admin',
      createdAt: new Date().toLocaleString()
    };

    setWithdrawalRecords([record, ...withdrawalRecords]);
    setShowAddRecordDialog(false);
    setNewRecord({
      holderName: '',
      holderId: '',
      amount: '',
      inrValue: '',
      walletAddress: '',
      transactionHash: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      paymentMethod: 'RBQ Wallet',
      status: 'Processed',
      notes: ''
    });

    toast.success('Withdrawal record added successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processed': return CheckCircle;
      case 'pending': return Clock;
      case 'failed': return XCircle;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Control Panel</h1>
              <p className="text-muted-foreground">Manage RBQ rates, user wallets, and withdrawal records</p>
            </div>
            <Badge variant="default" className="bg-primary text-primary-foreground">
              <Shield className="w-4 h-4 mr-1" />
              Admin Access
            </Badge>
          </div>
        </motion.div>

        {/* Overview Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current RBQ Rate</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{rbqRate.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Per RBQ Token</p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">Active Holders</p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total RBQ Holdings</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatRBQValue(users.reduce((sum, user) => sum + user.rbqBalance, 0))}
              </div>
              <p className="text-xs text-muted-foreground">RBQ Tokens</p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total INR Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatINRValue(users.reduce((sum, user) => sum + user.rbqBalance, 0))}
              </div>
              <p className="text-xs text-muted-foreground">Portfolio Value</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Admin Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="rate-management" className="space-y-6">
            <TabsList className=" sm:grid w-full sm:grid-cols-6 flex-wrap gap-2">
              <TabsTrigger value="rate-management">Rate Management</TabsTrigger>
              <TabsTrigger value="wallet-management">Wallet Management</TabsTrigger>
              <TabsTrigger value="sell-orders">Sell Orders</TabsTrigger>
              <TabsTrigger value="transaction-history">Transaction History</TabsTrigger>
              <TabsTrigger value="user-overview">User Overview</TabsTrigger>
              <TabsTrigger value="withdrawal-records">Withdrawal Records</TabsTrigger>
            </TabsList>

            {/* Rate Management Tab */}
            <TabsContent value="rate-management" className="space-y-6">
              {/* Current Rate and Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Current RBQ Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">₹{rbqRate.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground mt-1">Per RBQ Token</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Daily Change</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${dailyChange.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {dailyChange.amount >= 0 ? '+' : ''}₹{dailyChange.amount.toFixed(2)}
                    </div>
                    <p className={`text-sm mt-1 ${dailyChange.percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {dailyChange.percentage >= 0 ? '+' : ''}{dailyChange.percentage.toFixed(2)}%
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">7-Day Change</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${weeklyChange.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {weeklyChange.amount >= 0 ? '+' : ''}₹{weeklyChange.amount.toFixed(2)}
                    </div>
                    <p className={`text-sm mt-1 ${weeklyChange.percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {weeklyChange.percentage >= 0 ? '+' : ''}{weeklyChange.percentage.toFixed(2)}%
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Update Rate Card */}
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Update RBQ Rate</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert className="border-yellow-200 bg-yellow-50">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-800">
                      <strong>Important:</strong> Changing the RBQ rate will immediately affect all calculations throughout the platform, including user wallet values, transaction values, and payout calculations. The change will be recorded in price history.
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="current-rate">Current RBQ Rate</Label>
                        <Input
                          id="current-rate"
                          value={`₹${rbqRate.toFixed(2)} per RBQ`}
                          readOnly
                          className="bg-secondary text-lg font-semibold"
                        />
                      </div>

                      <div>
                        <Label htmlFor="new-rate">New RBQ Rate (INR)</Label>
                        <Input
                          id="new-rate"
                          type="number"
                          step="0.01"
                          placeholder="Enter new rate"
                          value={newRate}
                          onChange={(e) => setNewRate(e.target.value)}
                        />
                      </div>

                      <Button 
                        onClick={handleRateUpdate}
                        disabled={isUpdatingRate || newRate === rbqRate.toString()}
                        className="w-full"
                      >
                        {isUpdatingRate ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Updating Rate...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Update RBQ Rate
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Rate Change Preview</h3>
                      <div className="bg-secondary p-4 rounded-lg space-y-2">
                        <div className="flex justify-between">
                          <span>Current Rate:</span>
                          <span className="font-semibold">₹{rbqRate.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>New Rate:</span>
                          <span className="font-semibold">₹{parseFloat(newRate || '0').toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span>Change:</span>
                          <span className={`font-semibold ${
                            parseFloat(newRate || '0') > rbqRate ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {parseFloat(newRate || '0') > rbqRate ? '+' : ''}
                            {(parseFloat(newRate || '0') - rbqRate).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>% Change:</span>
                          <span className={`font-semibold ${
                            parseFloat(newRate || '0') > rbqRate ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {parseFloat(newRate || '0') > rbqRate ? '+' : ''}
                            {(((parseFloat(newRate || '0') - rbqRate) / rbqRate) * 100).toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Price History Card */}
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Price History</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Price (INR)</TableHead>
                          <TableHead>Change</TableHead>
                          <TableHead>% Change</TableHead>
                          <TableHead>Updated By</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {priceHistoryData.map((entry, index) => {
                          const previousEntry = priceHistoryData[index + 1];
                          const changeAmount = previousEntry ? entry.price - previousEntry.price : 0;
                          const changePercentage = previousEntry ? ((changeAmount / previousEntry.price) * 100) : 0;
                          
                          return (
                            <TableRow key={entry.id}>
                              <TableCell className="font-medium">{entry.date}</TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {entry.timestamp.split(' ')[1] || 'N/A'}
                              </TableCell>
                              <TableCell className="font-semibold">₹{entry.price.toFixed(2)}</TableCell>
                              <TableCell>
                                {previousEntry && (
                                  <span className={changeAmount >= 0 ? 'text-green-600' : 'text-red-600'}>
                                    {changeAmount >= 0 ? '+' : ''}₹{changeAmount.toFixed(2)}
                                  </span>
                                )}
                                {!previousEntry && <span className="text-muted-foreground">-</span>}
                              </TableCell>
                              <TableCell>
                                {previousEntry && (
                                  <span className={changePercentage >= 0 ? 'text-green-600' : 'text-red-600'}>
                                    {changePercentage >= 0 ? '+' : ''}{changePercentage.toFixed(2)}%
                                  </span>
                                )}
                                {!previousEntry && <span className="text-muted-foreground">-</span>}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{entry.updatedBy}</Badge>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wallet Management Tab */}
            <TabsContent value="wallet-management" className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Wallet className="w-5 h-5" />
                      <span>User Wallet Management</span>
                    </div>
                    <Dialog open={showWalletDialog} onOpenChange={setShowWalletDialog}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          New Transaction
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add/Deduct Tokens</DialogTitle>
                          <DialogDescription>
                            Manage user wallet balances by adding or deducting tokens.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Transaction Type</Label>
                            <Select value={transactionType} onValueChange={(value: 'add' | 'deduct') => setTransactionType(value)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="add">Add Tokens</SelectItem>
                                <SelectItem value="deduct">Deduct Tokens</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Select User</Label>
                            <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a user" />
                              </SelectTrigger>
                              <SelectContent>
                                {users.map((user) => (
                                  <SelectItem key={user.id} value={user.id}>
                                    {user.name} ({user.holderId}) - {formatRBQValue(user.rbqBalance)} RBQ
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Token Amount</Label>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="Enter token amount"
                              value={tokenAmount}
                              onChange={(e) => setTokenAmount(e.target.value)}
                            />
                            {tokenAmount && (
                              <p className="text-xs text-muted-foreground mt-1">
                                INR Value: ₹{(parseFloat(tokenAmount || '0') * rbqRate).toFixed(2)}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label>Reason</Label>
                            <Textarea
                              placeholder="Enter reason for this transaction"
                              value={transactionReason}
                              onChange={(e) => setTransactionReason(e.target.value)}
                            />
                          </div>

                          <div className="flex space-x-2">
                            <Button onClick={handleWalletTransaction} className="flex-1">
                              {transactionType === 'add' ? (
                                <>
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add Tokens
                                </>
                              ) : (
                                <>
                                  <Minus className="w-4 h-4 mr-2" />
                                  Deduct Tokens
                                </>
                              )}
                            </Button>
                            <Button variant="outline" onClick={() => setShowWalletDialog(false)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Holder ID</TableHead>
                        <TableHead>RBQ Balance</TableHead>
                        <TableHead>INR Value</TableHead>
                        <TableHead>KYC Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono">{user.holderId}</TableCell>
                          <TableCell className="font-semibold">
                            {formatRBQValue(user.rbqBalance)} RBQ
                          </TableCell>
                          <TableCell className="font-semibold text-green-600">
                            {formatINRValue(user.rbqBalance)}
                          </TableCell>
                          <TableCell>
                            <Badge className={user.kycStatus === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {user.kycStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedUserId(user.id);
                                  setTransactionType('add');
                                  setShowWalletDialog(true);
                                }}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedUserId(user.id);
                                  setTransactionType('deduct');
                                  setShowWalletDialog(true);
                                }}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sell Orders Tab */}
            <TabsContent value="sell-orders" className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span>All Sell Orders</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Token Amount</TableHead>
                        <TableHead>Minimum Price (INR)</TableHead>
                        <TableHead>Price per Token</TableHead>
                        <TableHead>Created Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getAllSellOrders().length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                            No sell orders found
                          </TableCell>
                        </TableRow>
                      ) : (
                        getAllSellOrders().map((order) => {
                          const StatusIcon = getStatusIcon(order.status);
                          return (
                            <TableRow key={order.id}>
                              <TableCell className="font-mono text-sm">{order.id.slice(-8)}</TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{order.userName}</p>
                                  <p className="text-xs text-muted-foreground">{order.holderId}</p>
                                </div>
                              </TableCell>
                              <TableCell className="font-semibold">
                                {formatRBQValue(order.tokenAmount)} RBQ
                              </TableCell>
                              <TableCell className="font-semibold text-green-600">
                                ₹{order.minimumPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </TableCell>
                              <TableCell>
                                ₹{order.pricePerToken.toFixed(2)}
                              </TableCell>
                              <TableCell>{order.createdDate}</TableCell>
                              <TableCell>
                                <Badge className={order.status === 'active' ? 'bg-blue-100 text-blue-800' : order.status === 'fulfilled' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                  {StatusIcon && <StatusIcon className="w-3 h-3 mr-1" />}
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {order.status === 'active' && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => cancelSellOrder(order.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <X className="w-3 h-3 mr-1" />
                                    Cancel
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Transaction History Tab */}
            <TabsContent value="transaction-history" className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="w-5 h-5" />
                    <span>All Transaction History</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>INR Value</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Created By</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getAllTransactions().map((transaction) => {
                        const user = users.find(u => u.id === transaction.userId);
                        const isPositive = ['add', 'deposit', 'bonus', 'payout'].includes(transaction.type);
                        
                        return (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{user?.name}</p>
                                <p className="text-xs text-muted-foreground">{user?.holderId}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                              {isPositive ? '+' : '-'}{formatRBQValue(transaction.amount)} RBQ
                            </TableCell>
                            <TableCell className="font-semibold">
                              {formatINRValue(transaction.amount)}
                            </TableCell>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell className="max-w-xs truncate">{transaction.reason}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{transaction.createdBy}</Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* User Overview Tab */}
            <TabsContent value="user-overview" className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>User Portfolio Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {users.map((user) => (
                      <Card key={user.id} className="border">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold">{user.name}</h3>
                              <p className="text-sm text-muted-foreground">{user.holderId}</p>
                            </div>
                            <Badge className={user.kycStatus === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {user.kycStatus}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">RBQ Balance:</span>
                            <span className="font-semibold">{formatRBQValue(user.rbqBalance)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">INR Value:</span>
                            <span className="font-semibold text-green-600">{formatINRValue(user.rbqBalance)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Join Date:</span>
                            <span className="text-sm">{user.joinDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Manager:</span>
                            <span className="text-sm">{user.assignedManager}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Withdrawal Records Tab */}
            <TabsContent value="withdrawal-records" className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-5 h-5" />
                      <span>Withdrawal Records Management</span>
                    </div>
                    <Dialog open={showAddRecordDialog} onOpenChange={setShowAddRecordDialog}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Record
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Add Withdrawal Record</DialogTitle>
                          <DialogDescription>
                            Create a new withdrawal record for tracking purposes.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Holder Name</Label>
                            <Input
                              value={newRecord.holderName}
                              onChange={(e) => setNewRecord({...newRecord, holderName: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Holder ID</Label>
                            <Input
                              value={newRecord.holderId}
                              onChange={(e) => setNewRecord({...newRecord, holderId: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Amount (RBQ)</Label>
                            <Input
                              value={newRecord.amount}
                              onChange={(e) => setNewRecord({...newRecord, amount: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>INR Value</Label>
                            <Input
                              value={newRecord.inrValue}
                              onChange={(e) => setNewRecord({...newRecord, inrValue: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Date</Label>
                            <Input
                              type="date"
                              value={newRecord.date}
                              onChange={(e) => setNewRecord({...newRecord, date: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Time</Label>
                            <Input
                              type="time"
                              value={newRecord.time}
                              onChange={(e) => setNewRecord({...newRecord, time: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Status</Label>
                            <Select value={newRecord.status} onValueChange={(value: 'Processed' | 'Pending' | 'Failed') => setNewRecord({...newRecord, status: value})}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Processed">Processed</SelectItem>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Failed">Failed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Payment Method</Label>
                            <Select value={newRecord.paymentMethod} onValueChange={(value) => setNewRecord({...newRecord, paymentMethod: value})}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="RBQ Wallet">RBQ Wallet</SelectItem>
                                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                                <SelectItem value="UPI">UPI</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="col-span-2">
                            <Label>Notes</Label>
                            <Textarea
                              value={newRecord.notes}
                              onChange={(e) => setNewRecord({...newRecord, notes: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button onClick={handleAddRecord} className="flex-1">
                            Add Record
                          </Button>
                          <Button variant="outline" onClick={() => setShowAddRecordDialog(false)}>
                            Cancel
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Record ID</TableHead>
                        <TableHead>Holder</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created By</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {withdrawalRecords.map((record) => {
                        const StatusIcon = getStatusIcon(record.status);
                        return (
                          <TableRow key={record.id}>
                            <TableCell className="font-mono text-sm">{record.id}</TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{record.holderName}</p>
                                <p className="text-xs text-muted-foreground">{record.holderId}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{record.amount}</p>
                                <p className="text-xs text-muted-foreground">{record.inrValue}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p>{record.date}</p>
                                <p className="text-xs text-muted-foreground">{record.time}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(record.status)}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {record.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">{record.createdBy}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}