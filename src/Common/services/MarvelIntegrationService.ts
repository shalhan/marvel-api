import { ApiGet } from '../interfaces/ApiGet';
import { HttpService } from '@nestjs/axios';
import { MD5 } from '../helpers/encryption';
import { Injectable } from '@nestjs/common';
import { MarvelApiResponse } from '../models';

@Injectable()
export class MarvelIntegrationService implements ApiGet<MarvelApiResponse> {
  private hash: string;
  private timestamp: string;
  private publicKey: string;
  constructor(private readonly httpService: HttpService) {
    const privateKey = process.env.MARVEL_API_PRIVATE_KEY;
    this.timestamp = `${new Date().getTime()}`;
    this.publicKey = process.env.MARVEL_API_PUBLIC_KEY;
    this.hash = MD5(`${this.timestamp}${privateKey}${this.publicKey}`);
  }
  private async callRequest(
    method: string,
    endpoint: string,
  ): Promise<MarvelApiResponse> {
    const queryParam = `?ts=${this.timestamp}&apikey=${this.publicKey}`;
    const response = await this.httpService
      .request<MarvelApiResponse>({
        baseURL: process.env.MARVEL_API_URL,
        method: method as any,
        url: `${endpoint}${queryParam}`,
      })
      .toPromise();
    return response.data;
  }
  async get(endpoint: string): Promise<MarvelApiResponse> {
    return this.callRequest('GET', endpoint);
  }
}
