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
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import ReceiptModal from './ReceiptModal';
import TransactionModal from './TransactionModal';
import SellOrders from './SellOrders';
import { 
  Wallet, 
  Download, 
  Upload, 
  QrCode, 
  Copy, 
  TrendingUp, 
  Calendar, 
  Shield, 
  User, 
  Settings,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  EyeOff,
  RefreshCw,
  XCircle,
  AlertTriangle,
  FileText,
  Timer,
  Edit,
  Save,
  X,
  Database,
  Receipt,
  ExternalLink,
  ZoomIn
} from 'lucide-react';
import { motion } from 'motion/react';

// Define the withdrawal record interface to match the admin system
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

interface Transaction {
  id: string;
  type: string;
  amount: string;
  value: string;
  date: string;
  time: string;
  status: string;
}

export default function Dashboard() {
  const { 
    rbqRate, 
    getCurrentUser, 
    formatRBQValue, 
    formatINRValue, 
    users, 
    currentUserId, 
    setCurrentUserId,
    getUserTransactions,
    getDailyChange,
    getWeeklyChange
  } = useRubyCon();
  const [showBalance, setShowBalance] = useState(true);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [depositAddress] = useState('RBQ1x7F9mK3nP8vQ2wR5tY6uE8dH4jS9cL1aB0');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<WithdrawalRecord | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  // Get current user data from context
  const currentUser = getCurrentUser();
  
  // Function to get display name (first name only for Vedant Sangwan)
  const getDisplayName = (fullName: string) => {
    if (fullName === 'Vedant Sangwan') {
      return 'Vedant';
    }
    return fullName;
  };
  
  const userProfile = {
    name: currentUser.name,
    displayName: getDisplayName(currentUser.name),
    holderId: currentUser.holderId,
    kycStatus: currentUser.kycStatus,
    joinDate: currentUser.joinDate,
    assignedManager: currentUser.assignedManager,
    managerContact: currentUser.managerContact
  };

  const walletData = {
    rbqBalance: formatRBQValue(currentUser.rbqBalance),
    inrValue: formatINRValue(currentUser.rbqBalance),
    walletAddress: "RBQ1x7F9mK3nP8vQ2wR5tY6uE8dH4jS9cL1aB0"
  };

  const dailyChange = getDailyChange();
  const weeklyChange = getWeeklyChange();

  const marketData = {
    currentPrice: `₹${rbqRate.toFixed(2)}`,
    change24h: `${dailyChange.percentage >= 0 ? '+' : ''}${dailyChange.percentage.toFixed(2)}%`,
    change24hAmount: `${dailyChange.amount >= 0 ? '+' : ''}₹${dailyChange.amount.toFixed(2)}`,
    change24hColor: dailyChange.percentage >= 0 ? 'text-green-600' : 'text-red-600',
    change7d: `${weeklyChange.percentage >= 0 ? '+' : ''}${weeklyChange.percentage.toFixed(2)}%`,
    change7dAmount: `${weeklyChange.amount >= 0 ? '+' : ''}₹${weeklyChange.amount.toFixed(2)}`,
    change7dColor: weeklyChange.percentage >= 0 ? 'text-green-600' : 'text-red-600',
    marketCap: "₹54.2Cr"
  };

  // Get user transactions from context
  const userTransactions = getUserTransactions(currentUserId);

  const [payouts, setPayouts] = useState([
    { date: "2024-08-05", amount: "324.53 RBQ", inr: "₹14,604", type: "Weekly Payout", status: "Completed" },
    { date: "2024-07-28", amount: "313.87 RBQ", inr: "₹14,124", type: "Weekly Payout", status: "Completed" },
    { date: "2024-07-21", amount: "324.21 RBQ", inr: "₹14,589", type: "Weekly Payout", status: "Completed" },
    { date: "2024-08-12", amount: "345.68 RBQ", inr: "₹15,556", type: "Weekly Payout", status: "Pending" }
  ]);

  const [pendingWithdrawals, setPendingWithdrawals] = useState([
    {
      id: "WDR-001",
      amount: "9,300.00 RBQ",
      inrValue: "₹4,18,500",
      destinationAddress: "RBQ7x2K9mL4pR6wS3tZ5uA8dH2jN8fM1cB9",
      requestDate: "2024-08-12",
      status: "Processing",
      estimatedCompletion: "2024-08-14",
      processingStage: "Final Review",
      progress: 85,
      fee: "46.50 RBQ",
      netAmount: "9,253.50 RBQ",
      priority: "High",
      notes: "Large withdrawal request - Final security verification in progress."
    },
    {
      id: "WDR-002",
      amount: "1,500.00 RBQ",
      inrValue: "₹67,500",
      destinationAddress: "RBQ9x5N2mP7qT8wV4yB6uC1dF3jL9hK2eD8",
      requestDate: "2024-08-11",
      status: "Under Review",
      estimatedCompletion: "2024-08-15",
      processingStage: "Compliance Check",
      progress: 35,
      fee: "7.50 RBQ",
      netAmount: "1,492.50 RBQ",
      priority: "Standard",
      notes: "Additional compliance verification required due to amount threshold."
    },
    {
      id: "WDR-003",
      amount: "752.50 RBQ",
      inrValue: "₹33,863",
      destinationAddress: "RBQ3x8P4mQ1rV5wY6zA2uF9dE7jK3gH1bL4",
      requestDate: "2024-08-10",
      status: "On Hold",
      estimatedCompletion: "Pending",
      processingStage: "Document Verification",
      progress: 15,
      fee: "3.76 RBQ",
      netAmount: "748.74 RBQ",
      priority: "Low",
      notes: "Additional KYC documentation required. Please contact support."
    }
  ]);

  // Enhanced withdrawal history with receipt system integration
  const [withdrawalHistory] = useState<WithdrawalRecord[]>([
    {
      id: "RBQ-WD-20240815-001",
      holderName: "John Doe",
      holderId: "RBC-15247",
      amount: "3,333.00 RBQ",
      inrValue: "₹1,49,985",
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
      holderName: "John Doe",
      holderId: "RBC-15247",
      amount: "2,200.00 RBQ",
      inrValue: "₹99,000",
      walletAddress: "RBQ5x4M8mN2pQ7wT9yC1uE6dJ4kH8gF2bR3",
      transactionHash: "0x9b1a2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b",
      date: "2024-08-03",
      time: "14:20",
      paymentMethod: "Bank Transfer",
      status: "Processed",
      notes: "Regular withdrawal to bank account",
      createdBy: "Sarah Wilson",
      createdAt: "2024-08-03 14:30"
    },
    {
      id: "RBQ-WD-20240720-003",
      holderName: "John Doe",
      holderId: "RBC-15247",
      amount: "1,100.00 RBQ",
      inrValue: "₹49,500",
      walletAddress: "RBQ8x6L1mO4pS7wU0zA3uG9dK2jM5hJ1cP6",
      transactionHash: "",
      date: "2024-07-20",
      time: "16:45",
      paymentMethod: "UPI",
      status: "Failed",
      notes: "Transaction failed due to insufficient verification",
      createdBy: "System",
      createdAt: "2024-07-20 16:50"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'under review': return 'bg-yellow-100 text-yellow-800';
      case 'on hold': return 'bg-red-100 text-red-800';
      case 'completed': 
      case 'processed': return 'bg-green-100 text-green-800';
      case 'cancelled':
      case 'failed': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing': return RefreshCw;
      case 'under review':
      case 'pending': return Clock;
      case 'on hold': return AlertTriangle;
      case 'completed':
      case 'processed': return CheckCircle;
      case 'cancelled':
      case 'failed': return XCircle;
      default: return Clock;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'text-red-600';
      case 'standard': return 'text-blue-600';
      case 'low': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleViewReceipt = (record: WithdrawalRecord) => {
    setSelectedReceipt(record);
    setShowReceiptModal(true);
  };

  const handleViewTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowTransactionModal(true);
  };

  const openBlockchainExplorer = (hash: string) => {
    // Mock blockchain explorer
    window.open(`https://rbqscan.io/tx/${hash}`, '_blank');
  };

  const handleEditStart = (itemId: string, currentValue: string) => {
    setEditingItem(itemId);
    setEditingValue(currentValue);
  };

  const handleEditSave = (itemId: string, field: string, collection: string) => {
    const [type, id] = itemId.split('-');
    
    if (collection === 'payouts') {
      setPayouts(prev => prev.map((item, index) => 
        index.toString() === id ? { ...item, [field]: editingValue } : item
      ));
    } else if (collection === 'pendingWithdrawals') {
      setPendingWithdrawals(prev => prev.map(item => 
        item.id === id ? { ...item, [field]: editingValue } : item
      ));
    }
    
    setEditingItem(null);
    setEditingValue('');
  };

  const handleEditCancel = () => {
    setEditingItem(null);
    setEditingValue('');
  };

  const EditableDate = ({ value, itemId, field, collection }: { value: string; itemId: string; field: string; collection: string }) => {
    const isEditing = editingItem === `${itemId}-${field}`;
    
    if (isEditing) {
      return (
        <div className="flex items-center space-x-1">
          <Input
            type="date"
            value={editingValue}
            onChange={(e) => setEditingValue(e.target.value)}
            className="w-32 text-xs"
          />
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleEditSave(`${itemId}-${field}`, field, collection)}
            className="h-6 w-6 p-0"
          >
            <Save className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleEditCancel}
            className="h-6 w-6 p-0"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-1 group">
        <span className="text-sm">{value}</span>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => handleEditStart(`${itemId}-${field}`, value)}
          className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Edit className="w-3 h-3" />
        </Button>
      </div>
    );
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
              <h1 className="text-3xl font-bold text-foreground">Welcome back, {userProfile.displayName}</h1>
              <p className="text-muted-foreground">Holder ID: {userProfile.holderId}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="user-select" className="text-sm">Switch User:</Label>
                <Select value={currentUserId} onValueChange={setCurrentUserId}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} ({user.holderId})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-800">
                <CheckCircle className="w-4 h-4 mr-1" />
                KYC Verified
              </Badge>
            </div>
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
              <CardTitle className="text-sm font-medium">RBQ Balance</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBalance(!showBalance)}
                className="h-6 w-6 p-0"
              >
                {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {showBalance ? walletData.rbqBalance : "••••••"}
              </div>
              <p className="text-xs text-muted-foreground">
                {showBalance ? walletData.inrValue : "••••••••"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Price</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{marketData.currentPrice}</div>
              <p className={`text-xs ${marketData.change24hColor}`}>
                {marketData.change24h} ({marketData.change24hAmount})
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">7-Day Change</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${marketData.change7dColor}`}>
                {marketData.change7d}
              </div>
              <p className={`text-xs ${marketData.change7dColor}`}>
                {marketData.change7dAmount}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Payout</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Aug 19</div>
              <p className="text-xs text-muted-foreground">Estimated: ₹15,556</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Dashboard Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="wallet" className="space-y-6">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="wallet">Wallet</TabsTrigger>
              <TabsTrigger value="sell-orders">Sell Orders</TabsTrigger>
              <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
              <TabsTrigger value="payouts">Payouts</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>

            {/* Wallet Tab */}
            <TabsContent value="wallet" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Wallet Info */}
                <Card className="bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Wallet className="w-5 h-5" />
                      <span>Wallet Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Wallet Address</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Input 
                          value={walletData.walletAddress} 
                          readOnly 
                          className="bg-secondary"
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(walletData.walletAddress)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertDescription>
                        Your wallet is secured with multi-signature technology and 2FA protection.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>

                {/* Actions */}
                <Card className="bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Deposit */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full flex items-center space-x-2">
                          <Download className="w-4 h-4" />
                          <span>Deposit RBQ</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Deposit RBQ Tokens</DialogTitle>
                          <DialogDescription>
                            Enter the amount of RBQ tokens you want to deposit to your wallet.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="w-32 h-32 bg-secondary mx-auto mb-4 flex items-center justify-center rounded-lg">
                              <QrCode className="w-16 h-16" />
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">Send RBQ to this address:</p>
                            <div className="flex items-center space-x-2">
                              <Input value={depositAddress} readOnly className="bg-secondary" />
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => copyToClipboard(depositAddress)}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Withdraw */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full flex items-center space-x-2">
                          <Upload className="w-4 h-4" />
                          <span>Withdraw RBQ</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Withdraw RBQ Tokens</DialogTitle>
                          <DialogDescription>
                            Enter the amount and destination address for your withdrawal.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="withdraw-amount">Amount (RBQ)</Label>
                            <Input
                              id="withdraw-amount"
                              type="number"
                              placeholder="Enter amount"
                              value={withdrawAmount}
                              onChange={(e) => setWithdrawAmount(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Current rate: 1 RBQ = ₹{rbqRate.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <Label htmlFor="destination-address">Destination Address</Label>
                            <Input
                              id="destination-address"
                              placeholder="Enter RBQ wallet address"
                            />
                          </div>
                          <Button className="w-full">
                            Confirm Withdrawal
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity Alert */}
              <Alert className="border-blue-200 bg-blue-50">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Welcome to your RubyCon Dashboard!</strong> All your wallet transactions and activity are displayed below. Switch between users using the dropdown above.
                </AlertDescription>
              </Alert>
            </TabsContent>

            {/* Sell Orders Tab */}
            <TabsContent value="sell-orders" className="space-y-6">
              <SellOrders />
            </TabsContent>

            {/* Enhanced Withdrawals Tab with Receipt System */}
            <TabsContent value="withdrawals" className="space-y-6">
              {/* Pending Withdrawals Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="bg-card/80 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Pending Withdrawals</p>
                        <p className="text-2xl font-bold">{pendingWithdrawals.length}</p>
                      </div>
                      <Timer className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                        <p className="text-2xl font-bold">11,552.50 RBQ</p>
                      </div>
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">INR Value</p>
                        <p className="text-2xl font-bold">₹5,19,863</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Withdrawal History with Receipts */}
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Receipt className="w-5 h-5" />
                    <span>Withdrawal History & Receipts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Withdrawal ID</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {withdrawalHistory.map((record) => {
                        const StatusIcon = getStatusIcon(record.status);
                        return (
                          <TableRow key={record.id}>
                            <TableCell className="font-mono text-sm">{record.id}</TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{record.amount}</p>
                                <p className="text-xs text-muted-foreground">{record.inrValue}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{record.paymentMethod}</Badge>
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
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleViewReceipt(record)}
                                  title="View Receipt"
                                  className="text-primary hover:text-primary/80"
                                >
                                  <Receipt className="w-4 h-4" />
                                </Button>
                                {record.transactionHash && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => openBlockchainExplorer(record.transactionHash)}
                                    title="View on Blockchain"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Pending Withdrawals Table */}
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Timer className="w-5 h-5" />
                    <span>Pending Withdrawals</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Request ID</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Request Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingWithdrawals.map((withdrawal) => {
                        const StatusIcon = getStatusIcon(withdrawal.status);
                        return (
                          <TableRow key={withdrawal.id}>
                            <TableCell className="font-mono text-sm">{withdrawal.id}</TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{withdrawal.amount}</p>
                                <p className="text-xs text-muted-foreground">{withdrawal.inrValue}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <Progress value={withdrawal.progress} className="w-20" />
                                <p className="text-xs text-muted-foreground">{withdrawal.progress}%</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <EditableDate 
                                value={withdrawal.requestDate} 
                                itemId={withdrawal.id} 
                                field="requestDate" 
                                collection="pendingWithdrawals"
                              />
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(withdrawal.status)}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {withdrawal.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className={`text-sm font-medium ${getPriorityColor(withdrawal.priority)}`}>
                                {withdrawal.priority}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" title="View Details">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payouts Tab */}
            <TabsContent value="payouts" className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Payout History</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>INR Value</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payouts.map((payout, index) => {
                        const StatusIcon = getStatusIcon(payout.status);
                        return (
                          <TableRow key={index}>
                            <TableCell>
                              <EditableDate 
                                value={payout.date} 
                                itemId={index.toString()} 
                                field="date" 
                                collection="payouts"
                              />
                            </TableCell>
                            <TableCell className="font-medium">{payout.amount}</TableCell>
                            <TableCell>{payout.inr}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{payout.type}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(payout.status)}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {payout.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enhanced Transactions Tab with Modal */}
            <TabsContent value="transactions" className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="w-5 h-5" />
                    <span>Transaction History</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created By</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userTransactions.map((transaction) => {
                        const isPositive = ['add', 'deposit', 'bonus', 'payout'].includes(transaction.type);
                        const amount = `${isPositive ? '+' : '-'}${formatRBQValue(transaction.amount)} RBQ`;
                        const value = formatINRValue(transaction.amount);
                        
                        return (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={isPositive ? 'text-green-600' : 'text-red-600'}>
                                {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                              {amount}
                            </TableCell>
                            <TableCell>{value}</TableCell>
                            <TableCell>
                              <div>
                                <p>{transaction.date}</p>
                                <p className="text-xs text-muted-foreground">{transaction.reason}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Completed
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-xs">
                                {transaction.createdBy}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Profile Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name</Label>
                      <Input value={userProfile.name} readOnly className="bg-secondary" />
                    </div>
                    <div>
                      <Label>Holder ID</Label>
                      <Input value={userProfile.holderId} readOnly className="bg-secondary" />
                    </div>
                    <div>
                      <Label>KYC Status</Label>
                      <Input value={userProfile.kycStatus} readOnly className="bg-secondary" />
                    </div>
                    <div>
                      <Label>Join Date</Label>
                      <Input value={userProfile.joinDate} readOnly className="bg-secondary" />
                    </div>
                    <div>
                      <Label>Assigned Manager</Label>
                      <Input value={userProfile.assignedManager} readOnly className="bg-secondary" />
                    </div>
                    <div>
                      <Label>Manager Contact</Label>
                      <Input value={userProfile.managerContact} readOnly className="bg-secondary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Admin Tab */}
            <TabsContent value="admin" className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Admin Controls</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      This section is for administrative functions. Contact your assigned manager for assistance.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Receipt Modal */}
        {showReceiptModal && (
          <ReceiptModal
            isOpen={showReceiptModal}
            onClose={() => setShowReceiptModal(false)}
            withdrawalData={selectedReceipt}
          />
        )}

        {/* Transaction Modal */}
        <TransactionModal
          isOpen={showTransactionModal}
          onClose={() => setShowTransactionModal(false)}
          transaction={selectedTransaction}
        />
      </div>
    </div>
  );
}