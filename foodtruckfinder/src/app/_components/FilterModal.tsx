import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { CheckBox } from "@mui/icons-material";

export default function FormDialog(props: {
  showModal: boolean;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [open, setOpen] = React.useState(props.showModal);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={props.showModal}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const email = formJson.email;
          console.log(email);
          handleClose();
        },
      }}
    >
      <DialogTitle>Filter Results</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Filter Results based on selection.
        </DialogContentText>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Listing Type
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Lost Pet"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="New Litter"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Searching for Home"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Rescue"
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            Pet Type
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Cat"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Dog"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Hamster"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Squirrel"
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            Hair Length
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Long Hair"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Short Hair"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Hairless"
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.closeModal(false)}>Cancel</Button>
        <Button type="submit">Filter Results</Button>
      </DialogActions>
    </Dialog>
  );
}
