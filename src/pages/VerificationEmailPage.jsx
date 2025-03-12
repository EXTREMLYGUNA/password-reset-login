import {useState} from 'react'
import { Button } from "@/components/ui/button";
import { useAuthStore } from '@/store/authStore';
import { toast } from "sonner"


import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function VerificationEmailPage() {
  const [value, setValue] = useState("");
  const {verifyEmail, isLoading, error} = useAuthStore()

  const handleSubmit = async ()=>{
    await verifyEmail(value)
    if(!error && !isLoading){
      toast('Received', {
          description: 'Email has been veirfied successfully',
          action: {
            label: "Done",
            onClick: () => console.log("Done"),
          },
        })
    }
  }

  return (
    <div className="space-y-2 felx flex-col w-full mx-auto justify-center">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup className="mx-auto" >
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm">
        {value === "" ? (
          <>Enter your verification email code.</>
        ) : (
          <>You entered: {value}</>
        )}
      </div>
      <Button className='space-y-2 flex-col w-full justify-center' onClick={handleSubmit}>Veify Email</Button>
    </div>
  )
}

