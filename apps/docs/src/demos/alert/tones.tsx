import { AlertDescription, AlertRoot, AlertTitle } from '@prism-ui/react';

export default function AlertTones() {
  return (
    <>
      <AlertRoot tone="info">
        <AlertTitle>Scheduled maintenance</AlertTitle>
        <AlertDescription>The API will be read-only on Sunday from 02:00 UTC.</AlertDescription>
      </AlertRoot>

      <AlertRoot tone="success">
        <AlertTitle>Payment received</AlertTitle>
        <AlertDescription>Your invoice for March has been settled.</AlertDescription>
      </AlertRoot>

      <AlertRoot tone="warning">
        <AlertTitle>Approaching your quota</AlertTitle>
        <AlertDescription>You have used 92% of this month&rsquo;s builds.</AlertDescription>
      </AlertRoot>

      <AlertRoot tone="danger">
        <AlertTitle>Deploy failed</AlertTitle>
        <AlertDescription>Two of six health checks did not pass.</AlertDescription>
      </AlertRoot>
    </>
  );
}
