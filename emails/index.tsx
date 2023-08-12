import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";
import { IProductCart } from "@/utils/type";
import { IEmailRoot } from "@/utils/types/email";

export default function EmailOrder(
  data: IProductCart[],
  emailContent?: IEmailRoot
) {
  return (
    <Html>
      <Section style={main}>
        <Container style={container}>
          <Text style={heading}>Thank you for your order!</Text>
          <Text style={paragraph}>
            {emailContent && emailContent.content ||
              "Your item is received and is headed your way."}
          </Text>
          {data?.map((item) => {
            return (
              <Text style={text} key={Math.random()}>
                + {item.title.toLowerCase()} - quanity: {item.quantity}
              </Text>
            );
          })}
        </Container>
      </Section>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
};

const text = {
  fontSize: "14px",
  lineHeight: "1.4",
  color: "black",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const heading = {
  fontSize: "22px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "black",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.4",
  color: "black",
};