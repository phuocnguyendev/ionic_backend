// src/database/elasticsearch/elasticsearch.service.ts
import { Client } from '@elastic/elasticsearch';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ElasticsearchService {
  private client: Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new Client({
      node: this.configService.get<string>('ELASTICSEARCH_URL'),
    });
  }

  async index(index: string, id: string, data: any) {
    return this.client.index({
      index,
      id,
      body: data,
    });
  }

  async search(index: string, query: any) {
    return this.client.search({
      index,
      body: query,
    });
  }

  async delete(index: string, id: string) {
    return this.client.delete({
      index,
      id,
    });
  }
}
