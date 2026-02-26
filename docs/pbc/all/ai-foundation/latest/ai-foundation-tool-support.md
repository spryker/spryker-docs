---
title: AI Tool Support
description: Enable AI to execute business operations and retrieve real-time data from your systems
template: concept-topic-template
last_updated: Feb 23, 2026
label: early-access
related:
  - title: AI Foundation
    link: /docs/pbc/all/ai-foundation/latest/ai-foundation.html
  - title: AI Conversation History
    link: /docs/pbc/all/ai-foundation/latest/ai-foundation-conversation-history.html
  - title: AI Structured Responses
    link: /docs/pbc/all/ai-foundation/latest/ai-foundation-structured-responses.html
  - title: AI Workflow Orchestration
    link: /docs/pbc/all/ai-foundation/latest/ai-foundation-workflow-orchestration.html
  - title: Use AI tools with the AiFoundation module
    link: /docs/dg/dev/ai/ai-foundation/ai-foundation-tool-support.html

---

AI Tool Support enables AI to execute business functions and retrieve real-time data from your commerce systems. Instead of only generating text responses, AI can check inventory, create support tickets, add items to carts, calculate shipping costs, retrieve order status, and trigger any custom business logic you define.

## Business value

### True automation, not just conversation

Traditional chatbots answer questions. AI with tool support completes tasks. When a customer asks "Is this product available in Berlin?" AI does not just generate a response. Instead, it checks your live inventory system and returns real-time availability.

### Reduced manual workload

Operations that previously required human intervention can be executed automatically:
- Customer wants to check order status → AI retrieves real order data from your system
- Buyer needs shipping cost calculation → AI calculates actual shipping costs based on your rules
- Customer reports an issue → AI creates a support ticket in your ticketing system
- User needs product recommendations → AI queries your catalog with specific filters

### Faster response times

Tool invocations happen in real-time during the conversation. No waiting for email responses, no handoffs to different systems, no manual data entry. Customer asks, AI acts, customer receives accurate results immediately.

### Scalable operations

AI tools scale infinitely without adding headcount:
- Handle thousands of simultaneous inventory checks
- Process unlimited shipping calculations
- Create support tickets 24/7 without staff
- Execute complex multi-step operations at scale

---

## When to use AI Tool Support

Use AI Tool Support when AI needs to interact with your commerce system to provide accurate, real-time information or complete operations:

### Real-time data retrieval

**Scenario:** Customer inquiries that require live system data, not generic responses.

**Examples:**
- "What is the status of my order?"
- "Do you have this product in stock in size Large?"
- "How much would shipping cost to Paris?"
- "What are your current promotional offers?"

**Without AI Tool Support:** AI generates generic responses or tells the customer to check elsewhere.

**With AI Tool Support:** AI queries your systems and provides actual, current data.

**Business impact:** Accurate information, improved customer trust, reduced support inquiries.

### Automated task execution

**Scenario:** Customer requests that require system modifications or data creation.

**Examples:**
- "Add three units to my cart"
- "Create a support ticket for this issue"
- "Send me a quote for these items"
- "Update my delivery address"

**Without AI Tool Support:** AI can only instruct the customer how to complete these tasks manually.

**With AI Tool Support:** AI executes the operation directly.

**Business impact:** Faster task completion, reduced friction, higher conversion rates.

### Complex calculations

**Scenario:** Customer questions requiring business logic or specialized calculations.

**Examples:**
- "Calculate volume discount for 500 units"
- "What is the total cost including customs fees?"
- "Which shipping method is most cost-effective?"
- "Compare warranty plans for this product"

**Without AI Tool Support:** AI makes rough estimates or generic statements.

**With AI Tool Support:** AI uses your actual business rules and pricing logic to calculate precise results.

**Business impact:** Accurate quotes, better customer confidence, reduced pricing errors.

### Multi-system orchestration

**Scenario:** Operations requiring coordination across multiple systems.

**Examples:**
- Check product availability across warehouse locations
- Verify customer credit status and suggest payment options
- Retrieve technical specifications from product database and compatibility information from engineering system
- Validate customer identity and retrieve order history from CRM

**Without AI Tool Support:** Customer must contact multiple departments or wait for manual coordination.

**With AI Tool Support:** AI orchestrates all system calls behind the scenes and provides unified responses.

**Business impact:** Seamless customer experience, reduced operational silos, faster end-to-end processes.

---

## How it works

AI Tool Support works through a mechanism called function calling. When configuring your AI, you provide a catalog of available tools the AI can invoke. During a conversation, the AI decides which tools to call based on the customer's intent.

### Tool execution flow

1. **Customer makes a request:** "Is product SKU-12345 available in Munich?"

2. **AI understands intent:** The AI recognizes this requires checking inventory.

3. **AI selects appropriate tool:** The AI identifies the "check_inventory" tool as relevant.

4. **AI invokes tool:** The AI calls the check_inventory function with parameters: SKU-12345, location: Munich.

5. **Your system executes:** Your Spryker system performs the actual inventory check.

6. **AI receives result:** The system returns: "Available: 47 units in Munich warehouse."

7. **AI formulates response:** "Yes, we have 47 units available in our Munich warehouse. Would you like to place an order?"

### The AI decides when to use tools

You do not need to program rules for when tools should trigger. The AI understands customer intent and automatically invokes appropriate tools:

- Customer asks "What is my order status?" → AI invokes `get_order_status` tool
- Customer asks "I need to return an item" → AI invokes `create_return_request` tool
- Customer asks "What is the weather?" → AI responds with text (no tool needed)

The AI knows which tools are available and when to use them based on the conversation context.

---

## Key capabilities

### Unlimited tool types

Define any business operation as an AI tool:

**Data retrieval tools:**
- Check product availability
- Get order status
- Retrieve customer information
- Look up technical specifications
- Search product catalog

**Data modification tools:**
- Add items to cart
- Update customer profile
- Create support tickets
- Reserve inventory
- Apply discount codes

**Calculation tools:**
- Calculate shipping costs
- Compute volume discounts
- Estimate delivery dates
- Compare product options
- Determine tax amounts

**Integration tools:**
- Query external APIs
- Call third-party services
- Retrieve CRM data
- Check payment gateway status
- Validate addresses

### Automatic error handling

When tools fail, AI handles errors gracefully:
- Product not found → AI suggests alternatives
- Inventory unavailable → AI offers backorder options
- System timeout → AI acknowledges issue and suggests next steps

### Tool chaining

AI can invoke multiple tools in sequence to complete complex tasks:

**Example:** Customer asks "What is the fastest shipping option for this product to Berlin?"

1. AI invokes `check_inventory` tool → Confirms availability
2. AI invokes `calculate_shipping` tool for each shipping method → Gets costs and timelines
3. AI compares results → Identifies fastest option
4. AI responds with comprehensive answer

All of this happens automatically during a single conversation turn.

### Security and permissions

Tools respect your business rules and permissions:
- Validate customer identity before sensitive operations
- Apply role-based access controls
- Enforce business constraints
- Audit all tool executions

---

## Business scenarios

### B2B self-service ordering

**Challenge:** B2B buyers need to check product specifications, verify compatibility, confirm availability, and calculate pricing before ordering. This traditionally requires sales representative involvement.

**Solution:** AI shopping assistant with tools:
- `get_product_specifications` tool → Retrieves technical details
- `check_compatibility` tool → Validates product compatibility
- `check_inventory` tool → Confirms stock levels
- `calculate_b2b_pricing` tool → Applies customer-specific pricing and volume discounts
- `create_quote` tool → Generates formal quote

**Result:** B2B buyers complete purchases independently, sales teams focus on strategic accounts, order cycle time reduced by 60%.

### Automated customer support

**Challenge:** Customer support teams spend significant time on routine inquiries that require system lookups: order status, return creation, address updates, and tracking information.

**Solution:** AI support assistant with tools:
- `get_order_status` tool → Retrieves current order information
- `track_shipment` tool → Gets carrier tracking details
- `create_return` tool → Initiates return process
- `update_address` tool → Modifies delivery address
- `create_support_ticket` tool → Escalates complex issues

**Result:** 70% of routine inquiries resolved instantly, support team capacity freed for complex cases, 24/7 support availability.

### Intelligent product discovery

**Challenge:** Customers struggle to find products that meet multiple technical criteria. Traditional search and filters are insufficient for complex requirements.

**Solution:** AI shopping assistant with tools:
- `search_products` tool → Finds products matching criteria
- `get_product_details` tool → Retrieves detailed specifications
- `check_stock` tool → Verifies availability
- `compare_products` tool → Highlights differences between options
- `get_similar_products` tool → Suggests alternatives

**Result:** Improved product discovery, higher conversion rates, reduced abandoned search sessions.

### Dynamic pricing and quotes

**Challenge:** Pricing depends on multiple factors: customer segment, order volume, current promotions, inventory levels, and market conditions. Manual quote generation is slow and error-prone.

**Solution:** AI quote assistant with tools:
- `calculate_pricing` tool → Applies customer-specific pricing rules
- `check_promotions` tool → Identifies applicable discounts
- `calculate_volume_discount` tool → Computes quantity-based pricing
- `generate_quote` tool → Creates formal quote document
- `send_quote` tool → Delivers quote to customer

**Result:** Instant quotes, accurate pricing, increased quote-to-order conversion, reduced pricing errors.

---

## Comparison to alternatives

### Traditional API integrations

**Traditional approach:** Build separate integrations for each feature. Customer must navigate multiple interfaces and workflows.

**AI Tool Support:** Single conversational interface that intelligently calls appropriate systems based on natural language.

### Manual processes

**Manual approach:** Customer submits request, human staff looks up information in systems, staff responds to customer.

**AI Tool Support:** Customer asks question, AI retrieves information automatically, customer receives immediate response.

### Scripted chatbots

**Scripted chatbot approach:** Predefined decision trees for specific scenarios. Rigid, limited to anticipated questions.

**AI Tool Support:** AI understands intent and selects appropriate tools dynamically. Flexible, handles unexpected questions.

---

## Best practices

### Start with read-only tools

Begin by implementing tools that retrieve data, not modify systems:
- Get order status
- Check inventory
- Calculate shipping
- Search products

Once confident, add tools that modify data:
- Add to cart
- Create support tickets
- Update addresses

### Design single-purpose tools

Create focused tools that do one thing well:
- **Good:** `check_inventory(sku, location)` - checks stock for specific product and location
- **Avoid:** `manage_inventory(sku, action_type, parameters)` - too generic, harder for AI to use correctly

### Provide clear tool descriptions

Help AI understand when to use each tool by providing clear descriptions:
- **Good:** "Checks real-time inventory availability for a specific product SKU and warehouse location. Returns available quantity and expected restock date if out of stock."
- **Avoid:** "Inventory checker"

### Return structured results

Tools should return consistent, structured data:
- **Good:** Return JSON with `{available: true, quantity: 47, location: "Munich"}`
- **Avoid:** Return free-text like "There are some units available"

### Handle errors gracefully

Tools should return informative error messages that AI can communicate to customers:
- **Good:** "Product SKU-12345 not found. Please verify the product code."
- **Avoid:** "Error 404"

