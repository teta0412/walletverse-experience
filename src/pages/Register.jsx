import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { authenticationService } from "@/services/authenticationService";
import { DatePicker } from "@/components/ui/date-picker";
import {
  validateEmail,
  validatePassword,
  validateName,
  validatePhone,
  validateAddress,
  validateDob,
  validateConfirmPassword
} from "../config/validation";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
        return validateName(value, 'First name');
      case 'lastName':
        return validateName(value, 'Last name');
      case 'email':
        return validateEmail(value);
      case 'phone':
        return validatePhone(value);
      case 'address':
        return validateAddress(value);
      case 'password':
        return validatePassword(value);
      case 'confirmPassword':
        return validateConfirmPassword(formData.password, value);
      case 'dob':
        return validateDob(value);
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleDateChange = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    setFormData(prev => ({
      ...prev,
      dob: formattedDate
    }));
    
    const error = validateDob(formattedDate);
    setErrors(prev => ({
      ...prev,
      dob: error
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    
    try {
      const { confirmPassword, ...registrationData } = formData;
      await authenticationService.register(registrationData);
      toast.success("Registration successful! Please verify your email.");
      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (error) {
      toast.error("Registration failed! Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-lg animate-fadeIn glass-card">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your information to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input 
                  name="firstName"
                  placeholder="First Name"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Input
                name="email"
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <DatePicker
                date={formData.dob ? new Date(formData.dob) : undefined}
                onDateChange={handleDateChange}
                className={`w-full ${errors.dob ? "border-red-500" : ""}`}
              />
              {errors.dob && (
                <p className="text-sm text-red-500">{errors.dob}</p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                name="address"
                placeholder="Address"
                required
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.address ? "border-red-500" : ""}
              />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  className={`pr-10 ${errors.password ? "border-red-500" : ""}`}
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  required
                  className={`pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <Link to="/login" className="text-sm text-primary hover:underline">
                Already have an account? Login
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Register"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;