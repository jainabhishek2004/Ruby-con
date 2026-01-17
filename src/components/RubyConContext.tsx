import React, { createContext, useContext, useState, ReactNode ,useEffect} from 'react';
import { toast } from 'sonner@2.0.3';
import { supabase } from "@/lib/supabase";

interface Transaction {
  id: string;
  userId: string;
  type: 'add' | 'deduct' | 'deposit' | 'payout' | 'bonus';
  amount: number;
  reason: string;
  date: string;
  createdBy: string;
}

interface User {
  id: string;
  name: string;
  holderId: string;
  email: string;
  rbqBalance: number;
  kycStatus: string;
  joinDate: string;
  assignedManager: string;
  managerContact: string;
}

interface PriceHistory {
  id: string;
  price: number;
  date: string;
  timestamp: string;
  updatedBy: string;
}

interface SellOrder {
  id: string;
  userId: string;
  userName: string;
  holderId: string;
  tokenAmount: number;
  minimumPrice: number;
  pricePerToken: number;
  status: 'active' | 'fulfilled' | 'cancelled';
  createdDate: string;
  updatedDate: string;
}

interface RubyConContextType {
  rbqRate: number;
  theme: { mode: 'light' | 'dark' };
  toggleTheme: () => void;
  setRbqRate: (rate: number) => void;
  users: User[];
  setUsers: (users: User[]) => void;
  currentUserId: string;
  setCurrentUserId: (userId: string) => void;
  transactions: Transaction[];
  priceHistory: PriceHistory[];
  sellOrders: SellOrder[];
  updateUserBalance: (userId: string, newBalance: number) => void;
  addTokensToUser: (userId: string, amount: number, reason: string) => void;
  deductTokensFromUser: (userId: string, amount: number, reason: string) => void;
  getCurrentUser: () => User;
  getUserTransactions: (userId: string) => Transaction[];
  getAllTransactions: () => Transaction[];
  formatRBQValue: (rbqAmount: number) => string;
  formatINRValue: (rbqAmount: number) => string;
  getDailyChange: () => { amount: number; percentage: number };
  getWeeklyChange: () => { amount: number; percentage: number };
  getPriceHistory: () => PriceHistory[];
  createSellOrder: (tokenAmount: number, minimumPrice: number) => void;
  cancelSellOrder: (orderId: string) => void;
  getUserSellOrders: (userId: string) => SellOrder[];
  getAllSellOrders: () => SellOrder[];
}


const RubyConContext = createContext<RubyConContextType | undefined>(undefined);

export const useRubyCon = () => {
  const context = useContext(RubyConContext);
  if (context === undefined) {
    throw new Error('useRubyCon must be used within a RubyConProvider');
  }
  return context;
};

interface RubyConProviderProps {
  children: ReactNode;
}

export const RubyConProvider: React.FC<RubyConProviderProps> = ({ children }) => {
  const [rbqRate, setRbqRateState] = useState(36.5); // Current rate set to 36.5 INR
  const [currentUserId, setCurrentUserId] = useState('user-001');
  const [theme, setTheme] = useState({ mode: 'light'});  

  
  // Price history tracking
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([
    {
      id: 'price-001',
      price: 28.50,
      date: '2024-09-23',
      timestamp: '2024-09-23 09:00:00',
      updatedBy: 'System'
    },
    {
      id: 'price-002',
      price: 29.75,
      date: '2024-09-24',
      timestamp: '2024-09-24 09:00:00',
      updatedBy: 'Admin'
    },
    {
      id: 'price-003',
      price: 31.20,
      date: '2024-09-25',
      timestamp: '2024-09-25 09:00:00',
      updatedBy: 'Admin'
    },
    {
      id: 'price-004',
      price: 30.80,
      date: '2024-09-26',
      timestamp: '2024-09-26 09:00:00',
      updatedBy: 'System'
    },
    {
      id: 'price-005',
      price: 32.10,
      date: '2024-09-27',
      timestamp: '2024-09-27 09:00:00',
      updatedBy: 'Admin'
    },
    {
      id: 'price-006',
      price: 33.45,
      date: '2024-09-28',
      timestamp: '2024-09-28 09:00:00',
      updatedBy: 'Admin'
    },
    {
      id: 'price-007',
      price: 34.90,
      date: '2024-09-29',
      timestamp: '2024-09-29 09:00:00',
      updatedBy: 'Admin'
    },
    {
      id: 'price-008',
      price: 35.25,
      date: '2024-09-30',
      timestamp: '2024-09-30 09:00:00',
      updatedBy: 'Admin'
    },
    {
      id: 'price-009',
      price: 35.80,
      date: '2024-10-01',
      timestamp: '2024-10-01 09:00:00',
      updatedBy: 'System'
    },
    {
      id: 'price-010',
      price: 36.50,
      date: '2024-10-02',
      timestamp: '2024-10-02 09:00:00',
      updatedBy: 'Admin'
    }
  ]);
  
  // Transaction history
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'txn-001',
      userId: 'user-001',
      type: 'deposit',
      amount: 5000,
      reason: 'Initial deposit',
      date: '2024-03-15',
      createdBy: 'System'
    },
    {
      id: 'txn-002',
      userId: 'user-001',
      type: 'bonus',
      amount: 1500,
      reason: 'Welcome bonus',
      date: '2024-03-16',
      createdBy: 'Admin'
    },
    {
      id: 'txn-003',
      userId: 'user-002',
      type: 'deposit',
      amount: 3000,
      reason: 'Initial deposit',
      date: '2024-02-20',
      createdBy: 'System'
    },
    {
      id: 'txn-004',
      userId: 'user-002',
      type: 'payout',
      amount: 500,
      reason: 'Weekly payout',
      date: '2024-04-01',
      createdBy: 'System'
    },
    {
      id: 'txn-005',
      userId: 'user-005',
      type: 'deposit',
      amount: 108,
      reason: 'Initial deposit',
      date: '2024-04-20',
      createdBy: 'System'
    },
    {
      id: 'txn-006',
      userId: 'user-005',
      type: 'add',
      amount: 4900,
      reason: 'Token allocation - September 2025',
      date: '2025-09-30',
      createdBy: 'Admin'
    },
    {
      id: 'txn-007',
      userId: 'user-005',
      type: 'add',
      amount: 83.71,
      reason: 'Additional token allocation - October 2025',
      date: '2025-10-02',
      createdBy: 'Admin'
    },
    {
      id: 'txn-008',
      userId: 'user-006',
      type: 'deposit',
      amount: 10044,
      reason: 'Initial token allocation',
      date: '2024-05-12',
      createdBy: 'System'
    }
  ]);
  
  // Mock users data
  const [users, setUsers] = useState<User[]>(null);
  const[loading, setLoading] = useState(true);

  //   [{
  //     id: 'user-001',
  //     name: 'John Doe',
  //     holderId: 'RBC-15247',
  //     email: 'john.doe@example.com',
  //     rbqBalance: 6500,
  //     kycStatus: 'Verified',
  //     joinDate: '2024-03-15',
  //     assignedManager: 'Sarah Wilson',
  //     managerContact: 'sarah.wilson@rubyconworld.in'
  //   },
  //   {
  //     id: 'user-002',
  //     name: 'Jane Smith',
  //     holderId: 'RBC-15248',
  //     email: 'jane.smith@example.com',
  //     rbqBalance: 3500,
  //     kycStatus: 'Verified',
  //     joinDate: '2024-02-20',
  //     assignedManager: 'David Johnson',
  //     managerContact: 'david.johnson@rubyconworld.in'
  //   },
  //   {
  //     id: 'user-003',
  //     name: 'Mike Johnson',
  //     holderId: 'RBC-15249',
  //     email: 'mike.johnson@example.com',
  //     rbqBalance: 15632.89,
  //     kycStatus: 'Pending',
  //     joinDate: '2024-04-10',
  //     assignedManager: 'Sarah Wilson',
  //     managerContact: 'sarah.wilson@rubyconworld.in'
  //   },
  //   {
  //     id: 'user-004',
  //     name: 'Sarah Brown',
  //     holderId: 'RBC-15250',
  //     email: 'sarah.brown@example.com',
  //     rbqBalance: 6892.15,
  //     kycStatus: 'Verified',
  //     joinDate: '2024-01-15',
  //     assignedManager: 'David Johnson',
  //     managerContact: 'david.johnson@rubyconworld.in'
  //   },
  //   {
  //     id: 'user-005',
  //     name: 'Vedant Sangwan',
  //     holderId: 'RBC-240188',
  //     email: 'vedant.sangwan@example.com',
  //     rbqBalance: 5091.71,
  //     kycStatus: 'Verified',
  //     joinDate: '2024-04-20',
  //     assignedManager: 'Sarah Wilson',
  //     managerContact: 'sarah.wilson@rubyconworld.in'
  //   },
  //   {
  //     id: 'user-006',
  //     name: 'Harsh Jain',
  //     holderId: 'RBC-240593',
  //     email: 'harsh.jain@example.com',
  //     rbqBalance: 10044,
  //     kycStatus: 'Verified',
  //     joinDate: '2024-05-12',
  //     assignedManager: 'David Johnson',
  //     managerContact: 'david.johnson@rubyconworld.in'
  //   }
  // ]);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data }) => {
      setUsers(data.session?.user ?? null);
      console.log('Initial user session:', data.session?.user ?? null);
      setLoading(false);
    });

    // Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsers(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);
  const setRbqRate = (rate: number) => {
    setRbqRateState(rate);
    
    // Add to price history
    const newPriceEntry: PriceHistory = {
      id: `price-${Date.now()}-${Math.random().toString(36).substr(2, 3)}`,
      price: rate,
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toLocaleString('en-IN', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
      }).replace(/(\d+)\/(\d+)\/(\d+),/, '$3-$2-$1'),
      updatedBy: 'Admin'
    };
    setPriceHistory(prev => [...prev, newPriceEntry]);
    
    toast.success(`RBQ rate updated to ₹${rate.toFixed(2)} per token`, {
      duration: 3000,
    });
  };
  const toggleTheme = () => {
    console.log('OOUCH TOGGLE THEME CALLED');
    setTheme(prevTheme => {
      const newMode = prevTheme.mode === 'light' ? 'dark' : 'light';
      return { ...prevTheme, mode: newMode };
    });
    console.log('Theme changed to:', theme.mode);
  };

  const updateUserBalance = (userId: string, newBalance: number) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, rbqBalance: newBalance } : user
      )
    );
  };

  const addTokensToUser = (userId: string, amount: number, reason: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.id === userId) {
          const newBalance = user.rbqBalance + amount;
          
          // Add transaction record
          const newTransaction: Transaction = {
            id: `txn-${Date.now()}-${Math.random().toString(36).substr(2, 3)}`,
            userId,
            type: 'add',
            amount,
            reason,
            date: new Date().toISOString().split('T')[0],
            createdBy: 'Admin'
          };
          setTransactions(prev => [newTransaction, ...prev]);
          
          toast.success(`Added ${amount.toFixed(2)} RBQ to ${user.name}'s wallet. Reason: ${reason}`, {
            duration: 4000,
          });
          return { ...user, rbqBalance: newBalance };
        }
        return user;
      })
    );
  };

  const deductTokensFromUser = (userId: string, amount: number, reason: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.id === userId) {
          const newBalance = Math.max(0, user.rbqBalance - amount);
          const actualDeducted = user.rbqBalance - newBalance;
          
          // Add transaction record
          const newTransaction: Transaction = {
            id: `txn-${Date.now()}-${Math.random().toString(36).substr(2, 3)}`,
            userId,
            type: 'deduct',
            amount: actualDeducted,
            reason,
            date: new Date().toISOString().split('T')[0],
            createdBy: 'Admin'
          };
          setTransactions(prev => [newTransaction, ...prev]);
          
          toast.success(`Deducted ${actualDeducted.toFixed(2)} RBQ from ${user.name}'s wallet. Reason: ${reason}`, {
            duration: 4000,
          });
          return { ...user, rbqBalance: newBalance };
        }
        return user;
      })
    );
  };

  const getCurrentUser = (): User => {
    
    return {users, 
         id: "user-001",
      name: users.email,
     holderId: 'RBC-15247',
      
      rbqBalance: 6500,
      kycStatus: 'Verified',
      joinDate: '2024-03-15',
      assignedManager: 'Sarah Wilson',
     managerContact: 'sarah.wilson@rubyconworld.in'};
  };

  const getUserTransactions = (userId: string): Transaction[] => {
    return transactions.filter(transaction => transaction.userId === userId);
  };

  const getAllTransactions = (): Transaction[] => {
    return transactions;
  };

  const formatRBQValue = (rbqAmount: number): string => {
    return rbqAmount.toLocaleString('en-IN', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  const formatINRValue = (rbqAmount: number): string => {
    const inrValue = rbqAmount * rbqRate;
    return `₹${inrValue.toLocaleString('en-IN', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  };

  const getDailyChange = (): { amount: number; percentage: number } => {
    if (priceHistory.length < 2) {
      return { amount: 0, percentage: 0 };
    }
    
    const sortedHistory = [...priceHistory].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    const currentPrice = rbqRate;
    const previousPrice = sortedHistory[1]?.price || sortedHistory[0].price;
    
    const amount = currentPrice - previousPrice;
    const percentage = previousPrice > 0 ? (amount / previousPrice) * 100 : 0;
    
    return { amount, percentage };
  };

  const getWeeklyChange = (): { amount: number; percentage: number } => {
    if (priceHistory.length === 0) {
      return { amount: 0, percentage: 0 };
    }
    
    const sortedHistory = [...priceHistory].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    const currentPrice = rbqRate;
    
    // Get price from 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    // Find the closest price entry to 7 days ago
    const weekOldPrice = sortedHistory.find(entry => 
      new Date(entry.date) <= sevenDaysAgo
    );
    
    const previousPrice = weekOldPrice?.price || sortedHistory[sortedHistory.length - 1]?.price || currentPrice;
    
    const amount = currentPrice - previousPrice;
    const percentage = previousPrice > 0 ? (amount / previousPrice) * 100 : 0;
    
    return { amount, percentage };
  };

  const getPriceHistory = (): PriceHistory[] => {
    return [...priceHistory].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  const [sellOrders, setSellOrders] = useState<SellOrder[]>([
    {
      id: 'sell-001',
      userId: 'user-001',
      userName: 'John Doe',
      holderId: 'RBC-15247',
      tokenAmount: 1000,
      minimumPrice: 35.00,
      pricePerToken: 35.00,
      status: 'active',
      createdDate: '2024-10-01',
      updatedDate: '2024-10-01'
    },
    {
      id: 'sell-002',
      userId: 'user-002',
      userName: 'Jane Smith',
      holderId: 'RBC-15248',
      tokenAmount: 500,
      minimumPrice: 34.50,
      pricePerToken: 34.50,
      status: 'active',
      createdDate: '2024-10-02',
      updatedDate: '2024-10-02'
    }
  ]);

  const createSellOrder = (tokenAmount: number, minimumPrice: number) => {
    const currentUser = getCurrentUser();
    if (currentUser.rbqBalance < tokenAmount) {
      toast.error('Insufficient RBQ balance to create sell order', {
        duration: 3000,
      });
      return;
    }
    console.log('Creating sell order for user:', currentUser);

    const newOrder: SellOrder = {
      id: `sell-${Date.now()}-${Math.random().toString(36).substr(2, 3)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      holderId: currentUser.holderId,
      tokenAmount,
      minimumPrice,
      pricePerToken: minimumPrice,
      status: 'active',
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0]
    };
    console.log('New sell order created:', newOrder);
    setSellOrders(prev => [newOrder, ...prev]);

    // Deduct tokens from user
    deductTokensFromUser(currentUser.id, tokenAmount, 'Sell order creation');

    toast.success(`Sell order created for ${tokenAmount} RBQ at ₹${minimumPrice.toFixed(2)} per token`, {
      duration: 4000,
    });
  };

  const cancelSellOrder = (orderId: string) => {
    setSellOrders(prev => 
      prev.map(order => {
        if (order.id === orderId) {
          // Add tokens back to user
          addTokensToUser(order.userId, order.tokenAmount, 'Sell order cancellation');
          return { ...order, status: 'cancelled', updatedDate: new Date().toISOString().split('T')[0] };
        }
        return order;
      })
    );

    toast.success(`Sell order ${orderId} cancelled`, {
      duration: 3000,
    });
  };

  const getUserSellOrders = (userId: string): SellOrder[] => {
    return sellOrders.filter(order => order.userId === userId);
  };

  const getAllSellOrders = (): SellOrder[] => {
    return sellOrders;
  };

  const value: RubyConContextType = {
    rbqRate,
    setRbqRate,
    users,
    setUsers,
    currentUserId,
    setCurrentUserId,
    transactions,
    priceHistory,
    sellOrders,
    updateUserBalance,
    addTokensToUser,
    deductTokensFromUser,
    getCurrentUser,
    getUserTransactions,
    getAllTransactions,
    formatRBQValue,
    formatINRValue,
    getDailyChange,
    getWeeklyChange,
    getPriceHistory,
    createSellOrder,
    cancelSellOrder,
    getUserSellOrders,
    getAllSellOrders,
    toggleTheme,
    theme
  };

  return (
    <RubyConContext.Provider value={value}>
      {children}
    </RubyConContext.Provider>
  );
};