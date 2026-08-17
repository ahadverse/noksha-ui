import type { DrawerSide } from '@prism-ui/react';
import {
  Button,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
  FieldLabel,
  FieldRoot,
  Input,
  Switch,
} from '@prism-ui/react';

const SIDES: DrawerSide[] = ['left', 'right', 'top', 'bottom'];

export default function DrawerSides() {
  return (
    <>
      {SIDES.map((side) => (
        <DrawerRoot key={side}>
          <DrawerTrigger asChild>
            <Button variant="outline" tone="neutral" className="capitalize">
              {side}
            </Button>
          </DrawerTrigger>

          <DrawerContent side={side} size="sm">
            <DrawerHeader>
              <DrawerTitle>Filters</DrawerTitle>
              <DrawerDescription>Narrow the deployment list.</DrawerDescription>
            </DrawerHeader>

            <DrawerBody>
              <div className="flex flex-col gap-4">
                <FieldRoot>
                  <FieldLabel>Branch</FieldLabel>
                  <Input size="sm" placeholder="main" />
                </FieldRoot>
                <FieldRoot orientation="horizontal">
                  <Switch defaultChecked />
                  <FieldLabel>Failed only</FieldLabel>
                </FieldRoot>
              </div>
            </DrawerBody>

            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="ghost" tone="neutral">
                  Reset
                </Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button>Apply</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </DrawerRoot>
      ))}
    </>
  );
}
