"use client"

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { usePathname } from "next/navigation";
import ConditionsOfUseContentRain from "./ConditionsOfUseContentRain";
import ConditionsOfUseContentEvap from "./ConditionsOfUseContentEvap";

interface Props {
  isOpen: boolean,
  onOpenChange: () => void,
}

export default function ConditionsOfUse({
  isOpen,
  onOpenChange,
}: Props) {
  const pathname = usePathname();
  const ContentComponent = pathname.startsWith("/evap")
    ? ConditionsOfUseContentEvap
    : ConditionsOfUseContentRain;
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl" isDismissable={false}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Please Read</ModalHeader>
            <ModalBody>
              <ContentComponent />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="flat" onPress={onClose}>
                OK
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
