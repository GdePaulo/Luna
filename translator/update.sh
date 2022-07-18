#!/bin/bash
# Make conda commands available to sub terminals
source c:/Users/Ameno/Anaconda3/etc/profile.d/conda.sh
conda activate luna-translate
gcloud builds submit --tag gcr.io/luna-8a91a/spellcheck
gcloud beta run deploy luna-spellcheck-run --image gcr.io/luna-8a91a/spellcheck --region=europe-west4