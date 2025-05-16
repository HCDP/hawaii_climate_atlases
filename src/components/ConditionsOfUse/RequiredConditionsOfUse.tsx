import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Checkbox } from "@heroui/checkbox";
import ConditionsOfUseContent from "@/components/ConditionsOfUse/ConditionsOfUseContent";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useConditionsOfUse from "@/hooks/useConditionsOfUse";

interface Props {
  isOpen: boolean,
  onOpenChange: () => void,
}

export default function RequiredConditionsOfUse({
  isOpen,
  onOpenChange,
}: Props) {
  const { updateDontShowConditionsOfUse } = useConditionsOfUse();
  const [doNotShow, setDoNotShow] = useState<boolean>(false);
  const router = useRouter();

  function handleAgreeClick() {
    updateDontShowConditionsOfUse(doNotShow);
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl" isDismissable={false}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Please Read</ModalHeader>
            <ModalBody>
              <ConditionsOfUseContent />
              <div className="flex justify-end space-x-0.5">
                <div>Do Not Show This Again</div>
                <Checkbox
                  onValueChange={setDoNotShow}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={() => {
                  onClose()
                  router.back();
                }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                variant="flat"
                onPress={() => {
                  handleAgreeClick();
                  onClose();
                }}
              >
                Agree
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}