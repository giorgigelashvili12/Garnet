# Fraud Detection Service

The **Fraud Detection Service** is a Python ML microservice powered by FastAPI, Scikit-Learn, PyTorch, and ONNX Runtime. It evaluates real-time payment transactions for fraud risk scores, anomaly detection, and velocity checks.

---

## Directory Structure

```plaintext
fraud/
├── Api/
│   └── main.py                     # FastAPI server entrypoint & REST endpoints
├── Application/
│   └── evaluator.py                # Feature extraction & inference execution logic
├── Domain/
│   └── risk_score.py               # Domain dataclasses & fraud risk classification logic
└── Infrastructure/
    └── model_loader.py             # ONNX/PyTorch model loader & model artifact registry
```

---

## Code Examples

### 1. Domain Types (`Domain/risk_score.py`)

```python
from dataclasses import dataclass
from enum import Enum

class RiskLevel(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"

@dataclass(frozen=True)
class RiskScoreResult:
    transaction_id: str
    risk_score: float
    level: RiskLevel
    reasons: list[str]
```

### 2. Infrastructure Model Loader (`Infrastructure/model_loader.py`)

```python
from typing import Any

class ModelLoader:
    def __init__(self, model_path: str = "models/fraud_v1.onnx"):
        self.model_path = model_path
        self._session: Any = None

    def load(self) -> None:
        # Load ONNX runtime session or PyTorch model
        pass

    def predict(self, features: list[float]) -> float:
        # Placeholder inference call returning probability
        return 0.05
```

### 3. FastAPI Service Entrypoint (`Api/main.py`)

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Garnet Fraud Service", version="1.0.0")

class TransactionPayload(BaseModel):
    transaction_id: str
    merchant_id: str
    amount: float
    currency: str

@app.post("/api/v1/fraud/evaluate")
async def evaluate_transaction(payload: TransactionPayload):
    return {
        "transaction_id": payload.transaction_id,
        "risk_score": 0.02,
        "status": "APPROVED"
    }
```
