import transformers as tr
import torch as ts

class hugBert(ts.nn.Module):
  def __init__(self, num_classes):
    super(hugBert, self).__init__()
    device = ts.device('cuda' if ts.cuda.is_available() else 'cpu')
    self.bert = tr.BertModel.from_pretrained('bert-base-uncased', return_dict=True).to(device)
    self.fc = ts.nn.Linear(768, num_classes, bias=False)
  
  def forward(self, x_input_ids, x_type_ids, attn_mask):
    outputs = self.bert(x_input_ids, token_type_ids=x_type_ids, attention_mask=attn_mask)
    pred = self.fc(outputs.pooler_output)
    return pred

# save 

# load


# tried like this and save weights after training
# otherwise use the method of the guy where you define the model in the handler 
