import React, { useState } from 'react';
import { useRubyCon } from './RubyConContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Shield, Eye, EyeOff, Mail, Lock, CheckCircle, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (credentials: { email: string; password: string }) => void;
}

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  // const { users, setCurrentUserId } = useRubyCon();
  // const [formData, setFormData] = useState({
  //   email: '',
  //   password: '',
  //   rememberMe: false,
  //   selectedUserId: users[0]?.id || ''
  // });
  // const [showPassword, setShowPassword] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [step, setStep] = useState('login'); // 'login', '2fa', 'success'
  // const [twoFactorCode, setTwoFactorCode] = useState('');

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
    
  //   // Simulate login process
  //   setTimeout(() => {
  //     if (formData.email && formData.password) {
  //       setStep('2fa');
  //     }
  //     setIsLoading(false);
  //   }, 1000);
  // };

  // const handle2FASubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
    
  //   // Simulate 2FA verification
  //   setTimeout(() => {
  //     if (twoFactorCode.length === 6) {
  //       setStep('success');
  //       setTimeout(() => {
  //         // Set the current user before login
  //         setCurrentUserId(formData.selectedUserId);
  //         onLogin(formData);
  //         onClose();
  //         // Reset form
  //         setFormData({ email: '', password: '', rememberMe: false, selectedUserId: users[0]?.id || '' });
  //         setTwoFactorCode('');
  //         setStep('login');
  //       }, 1500);
  //     }
  //     setIsLoading(false);
  //   }, 1000);
  // };

  // const securityFeatures = [
  //   "256-bit SSL encryption",
  //   "Two-factor authentication",
  //   "Regular security audits",
  //   "Multi-signature protection"
  // ];

  // return (
  //   <Dialog open={isOpen} onOpenChange={onClose}>
  //     <DialogContent className="sm:max-w-md">
  //       <DialogHeader>
  //         <DialogTitle className="flex items-center space-x-2">
  //           <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
  //             <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
  //           </div>
  //           <span>RubyCon Portal Access</span>
  //         </DialogTitle>
  //         <DialogDescription>
  //           {step === 'login' && 'Sign in to access your RubyCon dashboard and manage your RBQ tokens securely.'}
  //           {step === '2fa' && 'Enter the 6-digit code from your authenticator app to complete login.'}
  //           {step === 'success' && 'Authentication successful! Redirecting to your dashboard.'}
  //         </DialogDescription>
  //       </DialogHeader>

  //       {step === 'login' && (
  //         <motion.div 
  //           className="space-y-6"
  //           initial={{ opacity: 0, y: 20 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ duration: 0.5 }}
  //         >
  //           <form onSubmit={handleSubmit} className="space-y-4">
  //             <div>
  //               <Label htmlFor="user-select" className="flex items-center space-x-2">
  //                 <Users className="w-4 h-4" />
  //                 <span>Select User Account</span>
  //               </Label>
  //               <Select value={formData.selectedUserId} onValueChange={(value) => setFormData({...formData, selectedUserId: value})}>
  //                 <SelectTrigger>
  //                   <SelectValue placeholder="Choose a user account" />
  //                 </SelectTrigger>
  //                 <SelectContent>
  //                   {users.map((user) => (
  //                     <SelectItem key={user.id} value={user.id}>
  //                       <div className="flex flex-col">
  //                         <span className="font-medium">{user.name}</span>
  //                         <span className="text-xs text-muted-foreground">{user.holderId} • {user.email}</span>
  //                       </div>
  //                     </SelectItem>
  //                   ))}
  //                 </SelectContent>
  //               </Select>
  //             </div>

  //             <div>
  //               <Label htmlFor="email">Email Address</Label>
  //               <div className="relative">
  //                 <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
  //                 <Input
  //                   id="email"
  //                   type="email"
  //                   placeholder="your.email@example.com"
  //                   value={formData.email}
  //                   onChange={(e) => setFormData({...formData, email: e.target.value})}
  //                   className="pl-10"
  //                   required
  //                 />
  //               </div>
  //             </div>

  //             <div>
  //               <Label htmlFor="password">Password</Label>
  //               <div className="relative">
  //                 <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
  //                 <Input
  //                   id="password"
  //                   type={showPassword ? 'text' : 'password'}
  //                   placeholder="Enter your password"
  //                   value={formData.password}
  //                   onChange={(e) => setFormData({...formData, password: e.target.value})}
  //                   className="pl-10 pr-10"
  //                   required
  //                 />
  //                 <Button
  //                   type="button"
  //                   variant="ghost"
  //                   size="sm"
  //                   className="absolute right-1 top-1 h-8 w-8 p-0"
  //                   onClick={() => setShowPassword(!showPassword)}
  //                 >
  //                   {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
  //                 </Button>
  //               </div>
  //             </div>

  //             <div className="flex items-center space-x-2">
  //               <Checkbox
  //                 id="remember"
  //                 checked={formData.rememberMe}
  //                 onCheckedChange={(checked) => setFormData({...formData, rememberMe: checked as boolean})}
  //               />
  //               <Label htmlFor="remember" className="text-sm">Remember me for 30 days</Label>
  //             </div>

  //             <Button type="submit" className="w-full" disabled={isLoading}>
  //               {isLoading ? 'Authenticating...' : 'Login to Portal'}
  //             </Button>
  //           </form>

  //           <div className="text-center">
  //             <button className="text-sm text-primary hover:underline">
  //               Forgot your password?
  //             </button>
  //           </div>

  //           <Separator />

  //           <Alert>
  //             <Shield className="h-4 w-4" />
  //             <AlertDescription>
  //               Your login is protected by bank-grade security. All data is encrypted and secure.
  //             </AlertDescription>
  //           </Alert>

  //           <div className="space-y-2">
  //             <p className="text-sm font-medium text-foreground">Security Features:</p>
  //             <div className="grid grid-cols-2 gap-2">
  //               {securityFeatures.map((feature, index) => (
  //                 <div key={index} className="flex items-center space-x-2 text-xs text-muted-foreground">
  //                   <CheckCircle className="w-3 h-3 text-green-600" />
  //                   <span>{feature}</span>
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //         </motion.div>
  //       )}

  //       {step === '2fa' && (
  //         <motion.div 
  //           className="space-y-6"
  //           initial={{ opacity: 0, y: 20 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ duration: 0.5 }}
  //         >
  //           <div className="text-center">
  //             <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
  //               <Shield className="w-8 h-8 text-primary" />
  //             </div>
  //             <h3 className="text-lg font-semibold mb-2">Two-Factor Authentication</h3>
  //             <p className="text-sm text-muted-foreground">
  //               Enter the 6-digit code from your authenticator app
  //             </p>
  //           </div>

  //           <form onSubmit={handle2FASubmit} className="space-y-4">
  //             <div>
  //               <Label htmlFor="twofa">Verification Code</Label>
  //               <Input
  //                 id="twofa"
  //                 type="text"
  //                 placeholder="000000"
  //                 value={twoFactorCode}
  //                 onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
  //                 className="text-center text-lg tracking-widest"
  //                 maxLength={6}
  //                 required
  //               />
  //             </div>

  //             <Button type="submit" className="w-full" disabled={isLoading || twoFactorCode.length !== 6}>
  //               {isLoading ? 'Verifying...' : 'Verify & Login'}
  //             </Button>
  //           </form>

  //           <div className="text-center">
  //             <button 
  //               className="text-sm text-primary hover:underline"
  //               onClick={() => setStep('login')}
  //             >
  //               Back to login
  //             </button>
  //           </div>
  //         </motion.div>
  //       )}

  //       {step === 'success' && (
  //         <motion.div 
  //           className="text-center space-y-6"
  //           initial={{ opacity: 0, scale: 0.9 }}
  //           animate={{ opacity: 1, scale: 1 }}
  //           transition={{ duration: 0.5 }}
  //         >
  //           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
  //             <CheckCircle className="w-8 h-8 text-green-600" />
  //           </div>
  //           <div>
  //             <h3 className="text-lg font-semibold mb-2">Login Successful!</h3>
  //             <p className="text-sm text-muted-foreground">
  //               Redirecting to your dashboard...
  //             </p>
  //           </div>
  //         </motion.div>
  //       )}
  //     </DialogContent>
  //   </Dialog>
  // );
}