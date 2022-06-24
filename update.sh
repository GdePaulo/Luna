#!/bin/bash
# Make conda commands available to sub terminals
source c:/Users/Ameno/Anaconda3/etc/profile.d/conda.sh
cd translator
conda activate luna-translate
gcloud builds submit --tag gcr.io/luna-8a91a/flask-fire
gcloud beta run deploy luna-cloud-run --image gcr.io/luna-8a91a/flask-fire --region=europe-west4