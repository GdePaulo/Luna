# Luna AI

## Main guide

https://towardsdatascience.com/serving-pytorch-models-with-torchserve-6b8e8cbdb632

## Explanation

This AI module first loads a pre-trained ResNet model and then uses transfer learning to train it with the Food101 data set to classify 10 food classes. After training, the model weights are saved. The model is then served with TorchServe which allows inference using a REST API.

### Activating environment and navigating to folder

```
conda activate luna-ai
cd C:\Users\Ameno\Desktop\luna\ai
```

### To create a .MAR file from the model and saved weights

```
torch-model-archiver --model-name foodnet_resnet18 --version 1.0 --model-file model/model.py --serialized-file model/foodnet_resnet18.pth --handler model/handler.py --extra-files model/index_to_name.json
```

### To serve the model _(make sure to have admin rights or the workers will keep dying, can run using Anaconda terminal)_

#### Easy way

```
torchserve --start --ncs --ts-config deployment/config.properties --model-store deployment/model-store --models foodnet=foodnet_resnet18.mar
```

#### Separate model loading

```
torchserve --start --ncs --ts-config deployment/config.properties --model-store deployment/model-store
curl -X POST "http://localhost:9081/models?initial_workers=1&synchronous=true&url=foodnet_resnet18.mar"
curl -X PUT "http://localhost:9081/models/foodnet_resnet18?min_worker=3"
```

#### Check if server is okay

`curl http://localhost:9080/ping`

### Running inference

#### Downloading example image

```
curl -kLSs https://raw.githubusercontent.com/alvarobartt/pytorch-model-serving/master/images/sample.jpg -o sample.jpg
curl -kLSs https://glebekitchen.com/wp-content/uploads/2017/04/tonkotsuramenfront.jpg -o ramen.jpg
```

#### Forward pass _(change model name depending on loading method)_

`curl -X POST http://localhost:9080/predictions/foodnet -T sample.jpg`

### Shutting server down:

`torchserve --stop`

## Resources

[ResNet paper](https://arxiv.org/pdf/1512.03385.pdf)  
[Resnet TorchServe](https://github.com/pytorch/serve/tree/master/examples/image_classifier/resnet_18)  
[Implementing ResNet](https://towardsdatascience.com/residual-network-implementing-resnet-a7da63c7b278)  

[TorchServe general guide README](https://github.com/pytorch/serve/blob/master/README.md)  
[TorchServe general guide Wiki](https://pytorch.org/serve/server.html)  

[TorchServe tutorial](https://rubikscode.net/2020/06/22/pytorch-for-beginners-deploying-models-with-torchserve/)  

[Pytorch with SageMaker Python SDK](https://sagemaker.readthedocs.io/en/stable/frameworks/pytorch/using_pytorch.html#serve-a-pytorch-model)  
[Pytorch with SageMaker tutorial](https://samuelabiodun.medium.com/how-to-deploy-a-pytorch-model-on-sagemaker-aa9a38a277b6)  
[Pytorch with SageMaker Amazon guide](https://docs.aws.amazon.com/sagemaker/latest/dg/pytorch.html)  

[Future model CycleGAN](https://openaccess.thecvf.com/content_ICCV_2017/papers/Zhu_Unpaired_Image-To-Image_Translation_ICCV_2017_paper.pdf)

## Fixing forward pass bug

- Attempt with simple data & feedforward
- Inspect difference between data type of own definition and automatic sequence model
- Look into source code checking for dictionary datatype before removing samples in each batch