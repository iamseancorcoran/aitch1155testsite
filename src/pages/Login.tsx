import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const loginSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters."
  }),
  email: z.string().email({
    message: "Please enter a valid email address."
  })
});
type LoginValues = z.infer<typeof loginSchema>;
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    login
  } = useAuth();
  const {
    toast
  } = useToast();
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      email: ""
    }
  });
  const onSubmit = async (values: LoginValues) => {
    setIsLoading(true);
    try {
      // In a real application, this would verify credentials
      // For now, we just store the user information
      const success = await login(values.name, values.email);
      if (success) {
        toast({
          title: "Welcome!",
          description: `Hi ${values.name}, you've successfully logged in.`
        });
        navigate("/mint");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "There was a problem logging in. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden animate-fade-in">
      {/* Background gradient circles */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl"></div>
      
      {/* Main content */}
      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center space-y-2">
          <h1 className="tracking-tight font-semibold text-4xl px-[9px]">Cpd Smart Contract tester</h1>
          <p className="text-muted-foreground text-lg">
            Enter your details to continue
          </p>
        </div>

        <Card className="glass border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>Enter your information to be a blockchain Guinea Pig</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="name" render={({
                field
              }) => <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" className="bg-white/50 backdrop-blur-sm border-primary/20 focus:border-primary/50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                <FormField control={form.control} name="email" render={({
                field
              }) => <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" type="email" className="bg-white/50 backdrop-blur-sm border-primary/20 focus:border-primary/50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                <Button type="submit" className="w-full bg-primary/90 hover:bg-primary transition-all duration-300" disabled={isLoading}>
                  {isLoading ? <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </> : "Continue"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <p className="text-center text-sm text-muted-foreground mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>;
};
export default Login;